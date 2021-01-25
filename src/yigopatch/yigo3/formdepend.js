import { YIUI } from 'yes-core';
import { HashMap } from 'yes-core/dist/YIUI-common';
import { Expr } from 'yes-core/dist/YIUI-parser';

var FormDepend = (function(){

    var _formDepend = function(form){
        this.form = form;
        this.implCache = {};
        this.implMap = YIUI.ExprHandlerMap.getInstance();
    }

    _formDepend.prototype.getImpl = function(meta){
        var type = meta ? meta.type : 0,
            impl = this.implMap.getImpl(type);
        if( impl == null ) {
            type = 0;
            impl = this.implMap.getImpl(0);
        }

        var instance = this.implCache[type];
        if( instance ) {
            return instance;
        } else {
            return this.implCache[type] = new impl(this.form);
        }
    }

    _formDepend.prototype.build = function() {
        var self = this;

        var findImpl = function(meta){
            return self.getImpl(meta);
        }

        var calcBuilder    = new CalcTreeBuilder    (this.form,findImpl);
        var visibleBuilder = new VisibleTreeBuilder (this.form,findImpl);
        var enableBuilder  = new EnableTreeBuilder  (this.form,findImpl);
        var checkBuilder   = new CheckTreeBuilder   (this.form,findImpl);
        
        var stack = [];

        var root = this.form.metaForm.root;
        if( root ) {
            stack.push(root);
        }
        
        while( stack.length > 0 ) {
            var meta = stack.pop();
            var comp = this.form.getComponent(meta.key);
            calcBuilder   .doInitExp(comp);
            visibleBuilder.doInitExp(comp);
            enableBuilder .doInitExp(comp);
            checkBuilder  .doInitExp(comp);

            if( meta.items ) { // 面板
                Array.prototype.push.apply(stack,meta.items);
            } else if ( meta.root ) { // 子明细
                stack.push(meta.root);
            }
        }

        this.calcTree    = calcBuilder.   build();
        this.enableTree  = enableBuilder. build();
        this.visibleTree = visibleBuilder.build();
        this.checkTree   = checkBuilder.  build();
        this.checkRuleTree = this.checkTree;

        this.paraTree    = new ParaTree(this.form).build();
    }

    return _formDepend;
})();

//========================Builder=============================

var CalcTreeBuilder = (function(){

    var exclusion = [
        YIUI.CONTROLTYPE.BLOCK,
        YIUI.CONTROLTYPE.FLOWLAYOUTPANEL,
        YIUI.CONTROLTYPE.FLEXFLOWLAYOUTPANEL,
        YIUI.CONTROLTYPE.TABLELAYOUTPANEL,
        YIUI.CONTROLTYPE.GRIDLAYOUTPANEL,
        YIUI.CONTROLTYPE.FLUIDTABLELAYOUTPANEL,
        YIUI.CONTROLTYPE.SPLITPANEL,
        YIUI.CONTROLTYPE.TABPANEL,
        YIUI.CONTROLTYPE.BORDERLAYOUTPANEL,
        YIUI.CONTROLTYPE.COLUMNLAYOUTPANEL,
        YIUI.CONTROLTYPE.WIZARDPANEL,
        YIUI.CONTROLTYPE.DICTVIEW,
        YIUI.CONTROLTYPE.ATTACHMENT,
        YIUI.CONTROLTYPE.BPM_GRAPH,
        YIUI.CONTROLTYPE.CHART,
        YIUI.CONTROLTYPE.COLORPICKER,
        YIUI.CONTROLTYPE.CONTAINER,
        YIUI.CONTROLTYPE.FILECHOOSER,
        YIUI.CONTROLTYPE.FONTPICKER,
        YIUI.CONTROLTYPE.EMBED,
        YIUI.CONTROLTYPE.TOOLBAR,
        YIUI.CONTROLTYPE.SUBDETAIL
    ]

    return YIUI.extend({
        init: function(form,findImpl){
            this.form = form;
            this.findImpl = findImpl;
            this.graph = new Graph();
            this.tree = new CalcTree();
            this.lex = new Expr.Lexer();
        },
        doInitExp: function(meta){
            if( exclusion.indexOf(meta.type) != -1 ) {
                return;
            }
            var self = this,
                items = this.findImpl(meta).doCalcItemInit(meta);
            if( items && items.length > 0 ) {
                items.forEach(function(item){
                    self.graph.add(self.createNode(item));
                });
            }
        },
        createNode: function(item) {
            var node = new CalcDepGraphNode(item);
            var formula = item.getFormulaValue(),
                target = item.getTarget();
            if( formula ) {
                var lex = this.lex;
                lex.setContent(formula);
                var lexID = lex.next();
                while( lexID != -1 ) {
                    if( lexID == Expr.ID ) {
                        var dep = lex.getFullLexValue();
                        if( dep && dep !== target ) {
                            item.addDepend(dep);
                        }
                    } else if ( lexID == Expr.RANGE ) {
                        var range = lex.getLexValue();
                        var index = range.indexOf(':');
                        var first = range.substring(0,index);
                        var second = range.substring(index + 1);
    
                        index = YIUI.ColumnIDUtil.getSeparatorPos(first);
                        var c1 = first.substring(0,index + 1);
                        var c2 = first.substring(index + 1);
                        var firstColumn = YIUI.ColumnIDUtil.toColumnIndex(c1);
                        var firstRow = parseInt(c2);
    
                        index = YIUI.ColumnIDUtil.getSeparatorPos(second);
                        c1 = first.substring(0,index + 1);
                        c2 = first.substring(index + 1);
                        var secondColumn = YIUI.ColumnIDUtil.toColumnIndex(c1);
                        var secondRow = parseInt(c2);
    
                        for( var i = firstColumn;i <= secondColumn;i++ ) {
                            for( var j = firstRow;j < secondRow;j++ ) {
                                var id = YIUI.ColumnIDUtil.toColumnID(i) + j;
                                item.addDepend(id);
                            }
                        }
                    }
                    lexID = lex.next();
                }
            }
            return node;
        },
        build: function() {
            var self = this,resultList = [],circleList = [];

            // 创建有向图
            self.graph.create();
    
            // 拓扑排序
            if( !self.graph.sort(resultList,circleList,function(node){
                self.buildAffect(node);
            })) {
                var target = '';
                circleList.forEach(function(node){
                    target += node.getContent().getKey() + ",";
                });
                if( target ) {
                    target = target.substring(0,target.length - 1);
                }
                throw new Error("计算有循环依赖: " + target);
            }
    
            // 集合排序
            self.sortCalcTree(resultList);

            // 依赖排序
            self.tree.sortAffect();

            return self.tree;
        },
        buildAffect: function(node){
            if( node.hasOutputNodes() ) {
                var item = node.getContent().getItem();
                var affectItemSet = new CalcAffectItemSet(item.getTarget());
                var outNodes = node.getOutNodes();
                outNodes.forEach(function(outNode){
                    var affectItem = outNode.getContent().getItem();
                    affectItemSet.add(affectItem);
                });
                this.tree.addAffect(item.getTarget(),affectItemSet);
    
                var listener = node.getExtendData();
                if( listener ) {
                    listener.process(node);
                }
    
                var affectListener = null;
                outNodes.forEach(function(outNode){
                    affectListener = outNode.getExtendData();
                    if( affectListener == null ) {
                        affectListener = new CalcAffectItemSetListener();
                        outNode.setExtendData(affectListener);
                    }
                    affectListener.addItemSet(affectItemSet);
    
                    if( listener ) {
                        affectListener.addItemSets(listener.getItemSet());
                    }
                });
            }
        },
        sortCalcTree: function(nodeList){
            var index = 0;
            var lastSource = '';
            var itemSet = null;
            var self = this;
            nodeList.forEach(function(node){
                var item = node.getContent().getItem();
                item.setOrder(index++);
                var source = item.getSource();
                if( lastSource == source ) {
                    if( item.getType() == CalcItem.List ) {
                        if( itemSet == null ) {
                            itemSet = new CalcItemSet();
                            itemSet.setSource(source);
                            item.setOrder(item.getOrder());
                            self.tree.add(itemSet);
                        }
                        itemSet.add(item);
                    } else {
                        self.tree.add(item);
                        itemSet = null;
                    }
                } else {
                    if( item.getType() == CalcItem.List ) {
                        itemSet = new CalcItemSet();
                        itemSet.setSource(source);
                        itemSet.setOrder(item.getOrder());
                        itemSet.add(item);
    
                        self.tree.add(itemSet);
                    } else {
                        self.tree.add(item);
                        itemSet = null;
                    }
                }
                lastSource = source;
            });
        }
    });
})();

var VisibleTreeBuilder = (function(){

    var exclusion = [
        YIUI.CONTROLTYPE.BLOCK,
        YIUI.CONTROLTYPE.EMBED,
        YIUI.CONTROLTYPE.SUBDETAIL
    ]

    return YIUI.extend({
        init: function(form,findImpl) {
            this.form = form;
            this.findImpl = findImpl;
            this.tree = new VisibleTree();
            this.lex = new Expr.Lexer();
        },
        doInitExp: function(meta){
            if( exclusion.indexOf(meta.type) != -1 ) {
                return;
            }
            this.findImpl(meta).doVisibleItemInit(meta, this.tree);
        },
        build: function() {
            var self = this;
    
            // 添加操作的
            self.findImpl().doOperationVisibleInit(self.tree);
    
            // 依赖构建
            var items = self.tree.getItems(),o;
            for( var i = 0;i < items.length;i++ ) {
                o = items[i];
                if( o.getObjectType() == 1 ) {//set
                    o.getItems().forEach(function(item){
                        self.createAffect(item);
                    });
                } else {
                    self.createAffect(o);
                    if( o.type == VisibleItem.Operation ) { // 删除操作项
                        items.splice(i, 1);
                        i--;
                    }
                }
            }
    
            // 排序
            self.tree.sortAffect();

            return self.tree;
        },
        createAffect: function(vItem){
            var self = this,lex = self.lex;
            vItem.getItems().forEach(function(item){
                var content = item.getContent();
                if( content ) {
                    lex.setContent(content);
                    var lexID = lex.next();
                    while( lexID != -1 ) {
                        if( lexID == Expr.ID ) {
                            var s = lex.getLexValue();
                            var itemSet = self.tree.getAffect(s);
                            if( itemSet == null ) {
                                itemSet = new VisibleAffectItemSet(s);
                                self.tree.addAffect(s,itemSet);
                            }
                            itemSet.add(vItem);
                        }
                        lexID = lex.next();
                    }
                }
            });
    
            vItem.getDepends().forEach(function(s){
                s = s.trim();
                var itemSet = self.tree.getAffect(s);
                if( itemSet == null ) {
                    itemSet = new VisibleAffectItemSet(s);
                    self.tree.addAffect(s,itemSet);
                }
                itemSet.add(vItem);
            });
        }
    });
})();

var EnableTreeBuilder = (function() {

    var exclusion = [
        YIUI.CONTROLTYPE.BLOCK,
        YIUI.CONTROLTYPE.EMBED,
        YIUI.CONTROLTYPE.TOOLBAR,
        YIUI.CONTROLTYPE.SUBDETAIL,
        YIUI.CONTROLTYPE.FLOWLAYOUTPANEL,
        YIUI.CONTROLTYPE.FLEXFLOWLAYOUTPANEL,
        YIUI.CONTROLTYPE.TABLELAYOUTPANEL,
        YIUI.CONTROLTYPE.GRIDLAYOUTPANEL,
        YIUI.CONTROLTYPE.FLUIDTABLELAYOUTPANEL,
        YIUI.CONTROLTYPE.SPLITPANEL,
        YIUI.CONTROLTYPE.BORDERLAYOUTPANEL,
        YIUI.CONTROLTYPE.COLUMNLAYOUTPANEL,
        YIUI.CONTROLTYPE.WIZARDPANEL,
        YIUI.CONTROLTYPE.CONTAINER
    ]

    return YIUI.extend({
        init: function(form,findImpl){
            this.form = form;
            this.findImpl = findImpl;
            this.tree = new EnableTree();
            this.lex = new Expr.Lexer();
        },
        doInitExp: function(meta){
            if( exclusion.indexOf(meta.type) != -1 ) {
                return;
            }
            this.findImpl(meta).doEnableItemInit(meta, this.tree);
        },
        build: function() {
            var self = this;
    
            // 添加操作的
            self.findImpl().doOperationEnableInit(self.tree);
     
            // 依赖构建
            var items = self.tree.getItems(),o;
            for( var i = 0;i < items.length;i++ ) {
                o = items[i];
                if( o.getObjectType() == 1 ) {//set
                    o.getItems().forEach(function(item){
                        self.createAffect(item);
                    });
                } else {
                    self.createAffect(o);
                    if( o.type == EnableItem.Operation ) { // 删除操作项
                        items.splice(i, 1);
                        i--;
                    }
                }
            }
     
            // 排序
            self.tree.sortAffect();

            return self.tree;
        },
        createAffect: function(eItem) {
            var self = this,lex = self.lex;
            eItem.getItems().forEach(function(item){
                var content = item.getContent();
                if( content ) {
                    lex.setContent(content);
                    var lexID = lex.next();
                    while( lexID != -1 ) {
                        if( lexID == Expr.ID ) {
                            var s = lex.getLexValue();
                            var itemSet = self.tree.getAffect(s);
                            if( itemSet == null ) {
                                itemSet = new VisibleAffectItemSet(s);
                                self.tree.addAffect(s,itemSet);
                            }
                            itemSet.add(eItem);
                        }
                        lexID = lex.next();
                    }
                }
            });
    
            eItem.getDepends().forEach(function(s){
                s = s.trim();
                var itemSet = self.tree.getAffect(s);
                if( itemSet == null ) {
                    itemSet = new VisibleAffectItemSet(s);
                    self.tree.addAffect(s,itemSet);
                }
                itemSet.add(eItem);
            });
        }
    });
})();

var CheckTreeBuilder = (function() {

    var exclusion = [
        YIUI.CONTROLTYPE.MAP,
        YIUI.CONTROLTYPE.BLOCK,
        YIUI.CONTROLTYPE.EMBED,
        YIUI.CONTROLTYPE.TOOLBAR,
        YIUI.CONTROLTYPE.SUBDETAIL,
        YIUI.CONTROLTYPE.FLOWLAYOUTPANEL,
        YIUI.CONTROLTYPE.FLEXFLOWLAYOUTPANEL,
        YIUI.CONTROLTYPE.TABLELAYOUTPANEL,
        YIUI.CONTROLTYPE.GRIDLAYOUTPANEL,
        YIUI.CONTROLTYPE.TABPANEL,
        YIUI.CONTROLTYPE.FLUIDTABLELAYOUTPANEL,
        YIUI.CONTROLTYPE.SPLITPANEL,
        YIUI.CONTROLTYPE.BORDERLAYOUTPANEL,
        YIUI.CONTROLTYPE.COLUMNLAYOUTPANEL,
        YIUI.CONTROLTYPE.WIZARDPANEL,
        YIUI.CONTROLTYPE.CONTAINER,
        YIUI.CONTROLTYPE.DICTVIEW,
        YIUI.CONTROLTYPE.ATTACHMENT,
        YIUI.CONTROLTYPE.BPM_GRAPH,
        YIUI.CONTROLTYPE.CHART,
        YIUI.CONTROLTYPE.COLORPICKER,
        YIUI.CONTROLTYPE.TABGROUP,
        YIUI.CONTROLTYPE.FILECHOOSER,
        YIUI.CONTROLTYPE.FONTPICKER,
        YIUI.CONTROLTYPE.BUTTON,
    ]

    return YIUI.extend({
        init: function(form,findImpl){
            this.form = form;
            this.findImpl = findImpl;
            this.tree = new CheckTree();
            this.lex = new Expr.Lexer();
        },
        doInitExp: function(meta){
            if( exclusion.indexOf(meta.type) != -1 ) {
                return;
            }
            this.findImpl(meta).doCheckItemInit(meta, this.tree);
        },
        build: function() {
            var self = this;

            // 全局
            self.findImpl().doGlobalCheckInit(self.tree);
            
            // 依赖构建
            self.tree.getItems().forEach(function(o){
                if( o.getObjectType() == 1 ) {//set
                    o.getItems().forEach(function(item){
                        self.createAffect(item);
                    });
                } else {
                    self.createAffect(o);
                }
            });
    
            self.tree.sortAffect();

            return self.tree;
        },
        createAffect: function(cItem){
            var self = this,lex = self.lex,selfAdded = false;
            var target = cItem.getTarget();
            cItem.getItems().forEach(function(item){
                var content = item.getContent();
                if( content ) {
                    lex.setContent(content);
                    var lexID = self.lex.next();
                    while( lexID != -1 ) {
                        if( lexID == Expr.ID ) {
                            var s = lex.getLexValue();
                            var itemSet = self.tree.getAffect(s);
                            if( itemSet == null ) {
                                itemSet = new CheckAffectItemSet(s);
                                self.tree.addAffect(s,itemSet);
                            }
                            itemSet.add(cItem);
                            if( s == target ) {
                                selfAdded = true;
                            }
                        }
                        lexID = lex.next();
                    }
                }
            });
    
            cItem.getDepends().forEach(function(s){
                s = s.trim();
                var itemSet = self.tree.getAffect(s);
                if( itemSet == null ) {
                    itemSet = new VisibleAffectItemSet(s);
                    self.tree.addAffect(s,itemSet);
                }
                itemSet.add(cItem);
                if( s == target ) {
                    selfAdded = true;
                }
            });
    
            // 添加自身依赖
            if( !selfAdded ) {
                var affectItemSet = this.tree.getAffect(target);
                if( !affectItemSet ) {
                    affectItemSet = new CheckAffectItemSet(target);
                    this.tree.addAffect(target, affectItemSet);
                }
                affectItemSet.add(cItem);
            }
        }
    });
})();

//=======================CalcTree=============================

var CalcTree = (function(){

    var _calcTree = function(){
        this.items = [];
        this.affectItems = {};
    }

    _calcTree.prototype.clear = function(){
        this.items = [];
        this.affectItems = {};
    }

    _calcTree.prototype.add = function(item){
        this.items.push(item);
    }

    _calcTree.prototype.size = function(){
        return this.items.length;
    }

    _calcTree.prototype.get = function(index){
        return this.items[index];
    }

    _calcTree.prototype.getItems = function(){
        return this.items;
    }

    _calcTree.prototype.addAffect = function(key,itemSet){
        this.affectItems[key] = itemSet;
    }

    _calcTree.prototype.getAffect = function(key) {
        return this.affectItems[key];
    }

    _calcTree.prototype.sortAffect = function(){
        var affectItems = this.affectItems,keys = Object.keys(affectItems);
        keys.forEach(function(key){
            affectItems[key].sort();
        });
    }

    return _calcTree;
})();

var CalcAffectItemSet = (function(){

    var _calcAffectItemSet = function(source){
        this.source = source;
        this.items = [];
    }

    _calcAffectItemSet.prototype.add = function(item){
        if( this.items.indexOf(item) == -1 ) {
            this.items.push(item);
        }
    }

    _calcAffectItemSet.prototype.getSource = function(){
        return this.source;
    }

    _calcAffectItemSet.prototype.size = function(){
        return this.items.length;
    }

    _calcAffectItemSet.prototype.get = function(index) {
        return this.items[index];
    }

    _calcAffectItemSet.prototype.getArray = function() {
        return this.items;
    }

    _calcAffectItemSet.prototype.sort = function(){
        this.items.sort(function(item1,item2){
            return item1.order - item2.order;
        });

        var tmpItemArray = [];
        var lastSource = '';
        var itemSet = null;

        this.items.forEach(function(item){
            var source = item.source;
            if( lastSource == source ) {
                if( item.getType() == CalcItem.List ) {
                    if( itemSet == null ) {
                        itemSet = new CalcItemSet();
                        itemSet.setSource(source);
                        itemSet.setOrder(item.order);
                        tmpItemArray.push(itemSet);
                    }
                    itemSet.add(item);
                } else {
                    tmpItemArray.push(item);
                    itemSet = null;
                }
            } else {
                if( item.getType() == CalcItem.List ) {
                    itemSet = new CalcItemSet();
                    itemSet.setSource(source);
                    itemSet.setOrder(item.order);
                    itemSet.add(item);
                    tmpItemArray.push(itemSet);
                } else {
                    tmpItemArray.add(item);
                    itemSet = null;
                }
            }
            lastSource = source;
        });
        this.items = tmpItemArray;
    }

    return _calcAffectItemSet;
})();

var CalcAffectItemSetListener = (function(){

    var _calcAffectItemSetListener = function(){
        this.itemSetArray = [];
    }

    _calcAffectItemSetListener.prototype.addItemSet = function(itemSet){
        if( this.itemSetArray.indexOf(itemSet) == -1 ) {
            this.itemSetArray.push(itemSet);
        }
    }

    _calcAffectItemSetListener.prototype.getItemSet = function(){
        return this.itemSetArray;
    }

    _calcAffectItemSetListener.prototype.addItemSets = function(itemSets){
        var self = this;
        itemSets.forEach(function(itemSet){
            self.addItemSet(itemSet);
        });
    }

    _calcAffectItemSetListener.prototype.process = function(node){
        if( node.hasOutputNodes() ) {
            var outNodes = node.getOutNodes();
            this.itemSetArray.forEach(function(itemSet){
                outNodes.forEach(function(outNode){
                    itemSet.add(outNode.getContent().getItem());
                });
            });
        }
    }

    return _calcAffectItemSetListener;
})();

var Graph = (function(){

    var _graph = function(){
        this.nodeArray = [];
        this.nodeMap = new HashMap();
    }

    _graph.prototype.add = function(content){
        var node = new GraphNode(content);
        this.nodeArray.push(node);
        this.nodeMap.put(content.getKey(),node);
    }

    _graph.prototype.get = function(key) {
        var node = this.nodeMap.get(key);
        return node ? node.getContent() : null;
    }

    _graph.prototype.create = function() {
        var nodeMap = this.nodeMap;
        this.nodeArray.forEach(function(node){
            var inKeys = node.getContent().getInputKeys();
            if( inKeys && inKeys.length > 0 ) {
                inKeys.forEach(function(inKey){
                    var inNode = nodeMap.get(inKey);
                    if( inNode ) {
                        inNode.addOutNode(node);
                        node.addInNode(inNode);
                    }
                });
            }
        });
    }

    _graph.prototype.sort = function(resultList,circleList,callback) {
        var nodeCount = this.nodeArray.length;
        if( nodeCount == 0 ) {
            return true;
        }

        var workStack = [];

        this.nodeArray.forEach(function(node){
            if( node.hasNoInputNodes() ) {
                workStack.push(node);
            }
        });
        
        if( workStack.length == 0 ) {
            return false;
        }

        var tmpNodeArray = [];
        Array.prototype.push.apply(tmpNodeArray,this.nodeArray);

        var resultCount = 0;
        while( workStack.length > 0 ) {
            var node = workStack.pop();
            resultList.push(node);
            if( callback ) {
                callback(node);
            }

            tmpNodeArray.removeElement(node);
            resultCount++;

            var outNodes = node.getOutNodes();
            if( outNodes ) {
                outNodes.forEach(function(outNode){
                    outNode.removeInNode(node);
                    if( outNode.hasNoInputNodes() ) {
                        workStack.push(outNode);
                    }
                });
            }
            node.removeAllOutNodes();
        }

        // 存在环
        if( resultCount < nodeCount ) {
            tmpNodeArray.forEach(function(node){
                circleList.push(node);
            });
            return false;
        }
        return true;
    }

    return _graph;
})();

var GraphNode = (function(){

    var _graphNode = function(content){
        this.content = content;
        this.inNodes = null;
        this.outNodes = null;
        this.extendData = null;
    }

    _graphNode.prototype.addInNode = function(node){
        if( this.inNodes == null ) {
            this.inNodes = [];
        }
        this.inNodes.push(node);
    }

    _graphNode.prototype.addOutNode = function(node){
        if( this.outNodes == null ) {
            this.outNodes = [];
        }
        this.outNodes.push(node);
    }

    _graphNode.prototype.hasInputNodes = function(){
        return this.inNodes && this.inNodes.length > 0;
    }

    _graphNode.prototype.hasOutputNodes = function(){
        return this.outNodes && this.outNodes.length > 0;
    }

    _graphNode.prototype.hasNoInputNodes = function(){
        return !this.inNodes || this.inNodes.length == 0;
    }

    _graphNode.prototype.removeInNode = function(node) {
        this.inNodes.removeElement(node);
    }

    _graphNode.prototype.removeOutNode = function(node) {
        this.outNodes.removeElement(node);
    }

    _graphNode.prototype.removeAllOutNodes = function(node) {
        if( this.outNodes ) {
            this.outNodes.length = 0;
        }
    }

    _graphNode.prototype.setContent = function(content) {
        this.content = content;
    }

    _graphNode.prototype.getContent = function() {
        return this.content;
    }

    _graphNode.prototype.getInNodes = function(){
        return this.inNodes;
    }

    _graphNode.prototype.getOutNodes = function(){
        return this.outNodes;
    }

    _graphNode.prototype.setExtendData = function(extendData) {
        this.extendData = extendData;
    }

    _graphNode.prototype.getExtendData = function(extendData) {
        return this.extendData;
    }

    return _graphNode;
})();

var CalcDepGraphNode = (function(){

    var _calcDepGraphNode = function(item) {
        this.item = item;
    }

    _calcDepGraphNode.prototype.getKey = function(){
        return this.item.getTarget();
    }

    _calcDepGraphNode.prototype.getInputKeys = function(){
        return this.item.getDepends();
    }

    _calcDepGraphNode.prototype.getItem = function(){
        return this.item;
    }

    return _calcDepGraphNode;
})();

export var CalcItem = (function(){

    var _calcItem = function(target,source,type){
        this.source = source;
        this.type = type;
        this.target = target;
        this.formulaValue = '';
        this.defaultValue = '';
        this.order = -1;
        this.depends = [];
        this.pos = null;
        this.syntaxTree = null;
        this.treeSum = false;
        this.treeInit = false;
        this.objectType = YIUI.ExprItem_Type.Item;
    }

    _calcItem.Head = 0;
    _calcItem.List = 1;

    _calcItem.prototype.setType = function(type){
        this.type = type;
    }

    _calcItem.prototype.getType = function(){
        return this.type;
    }

    _calcItem.prototype.setTree = function(tree){
        this.syntaxTree = tree;
    }

    _calcItem.prototype.getTree = function(){
        return this.syntaxTree;
    }

    _calcItem.prototype.setSource = function(source){
        this.source = source;
    }

    _calcItem.prototype.getSource = function(){
        return this.source;
    }

    _calcItem.prototype.setTarget = function(target){
        this.target = target;
    }

    _calcItem.prototype.getTarget = function(){
        return this.target;
    }
    
    _calcItem.prototype.setFormulaValue = function(formulaValue){
        this.formulaValue = formulaValue;
    }

    _calcItem.prototype.getFormulaValue = function(){
        return this.formulaValue;
    }

    _calcItem.prototype.setDefaultValue = function(defaultValue){
        this.defaultValue = defaultValue;
    }

    _calcItem.prototype.getDefaultValue = function(){
        return this.defaultValue;
    }

    _calcItem.prototype.isTreeSum = function(){
        return this.treeSum;
    }

    _calcItem.prototype.setTreeSum = function(treeSum){
        this.treeSum = treeSum;
    }

    _calcItem.prototype.setOrder = function(order){
        this.order = order;
    }

    _calcItem.prototype.getOrder = function(){
        return this.order;
    }

    _calcItem.prototype.isEmpty = function(){
        return !this.defaultValue && !this.formulaValue;
    }

    _calcItem.prototype.setPos = function(pos){
        this.pos = pos;
    }

    _calcItem.prototype.getPos = function(){
        return this.pos;
    }

    _calcItem.prototype.getObjectType = function(){
        return this.objectType;
    }

    _calcItem.prototype.addDepends = function(depends){
        var self = this;
        depends.forEach(function(depend){
            self.addDepend(depend);
        });
    }

    _calcItem.prototype.addDepend = function(depend){
        (this.depends.indexOf(depend) == -1) && this.depends.push(depend);
    }

    _calcItem.prototype.getDepends = function(){
        return this.depends;
    }

    return _calcItem;
})();

export var CalcItemSet = (function(){

    var _calcItemSet = function(source){
        this.source = source;
        this.items = [];
        this.objectType = YIUI.ExprItem_Type.Set; // set
    }

    _calcItemSet.prototype.getObjectType = function(){
        return this.objectType;
    }

    _calcItemSet.prototype.setSource = function(source){
        this.source = source;
    }

    _calcItemSet.prototype.getSource = function(){
        return this.source;
    }

    _calcItemSet.prototype.setOrder = function(order){
        this.order = order;
    }

    _calcItemSet.prototype.getOrder = function(){
        return this.order;
    }

    _calcItemSet.prototype.add = function(item) {
        this.items.push(item);
    }

    _calcItemSet.prototype.size = function(){
        return this.items.length;
    }

    _calcItemSet.prototype.getItems = function(){
        return this.items;
    }

    _calcItemSet.prototype.get = function(index) {
        return this.items[index];
    }

    return _calcItemSet;
})();

//=======================VisibleTree==========================

var VisibleTree = (function(){

    var _visibleTree = function(){
        this.items = [];
        this.rowMap = null;
        this.affectItems = {};
    }

    _visibleTree.prototype.clear = function(){
        this.items = [];
        this.rowMap = null;
        this.affectItems = {};
    }

    _visibleTree.prototype.getItems = function(){
        return this.items;
    }

    _visibleTree.prototype.put = function(rowKey,item) {
        if( this.rowMap == null ) {
            this.rowMap = new HashMap();
        }
        this.rowMap.put(rowKey,item);
    }

    _visibleTree.prototype.add = function(item) {
        this.items.push(item);
    }

    _visibleTree.prototype.size = function(){
        return this.items.length;
    }

    _visibleTree.prototype.get = function(index) {
        return this.items[index];
    }

    _visibleTree.prototype.addAffect = function(key,itemSet){
        this.affectItems[key] = itemSet;
    }

    _visibleTree.prototype.getAffect = function(key) {
        return this.affectItems[key];
    }

    _visibleTree.prototype.sortAffect = function(){
        var affectItems = this.affectItems,keys = Object.keys(affectItems);
        keys.forEach(function(key){
            affectItems[key].sort();
        });
    }

    return _visibleTree;
})();

var VisibleAffectItemSet = (function(){

    var _visibleAffectItemSet = function(source){
        this.source = source;
        this.items = [];
    }

    _visibleAffectItemSet.prototype.setSource = function(source){
        this.source = source;
    }

    _visibleAffectItemSet.prototype.getSource = function(){
        return this.source;
    }

    _visibleAffectItemSet.prototype.add = function(item){
        if( this.items.indexOf(item) == -1 ) {
            this.items.push(item);
        }
    }

    _visibleAffectItemSet.prototype.size = function(){
        return this.items.length;
    }

    _visibleAffectItemSet.prototype.get = function(index){
        return this.items[index];
    }

    _visibleAffectItemSet.prototype.getArray = function(){
        return this.items;
    }

    _visibleAffectItemSet.prototype.sort = function(){
        var tmpItemArray = [];
        var lastSource = '';
        var itemSet = null;

        this.items.forEach(function(item){
            var source = item.getSource();
            if( lastSource == source ) {
                if( item.getType() == VisibleItem.Column ) {
                    if( itemSet == null ) {
                        itemSet = new VisibleItemSet(source);
                        tmpItemArray.push(itemSet);
                    }
                    itemSet.add(item);
                } else {
                    tmpItemArray.push(item);
                    itemSet = null;
                }
            } else {
                if( item.getType() == VisibleItem.Column ) {
                    itemSet = new VisibleItemSet(source);
                    itemSet.add(item);
                    tmpItemArray.push(itemSet);
                } else {
                    tmpItemArray.push(item);
                    itemSet = null;
                }
            }
            lastSource = source;
        });
        this.items = tmpItemArray;
    }

    return _visibleAffectItemSet;
})();

export var VisibleItem = (function(){

    var _visibleItem = function(target,source,type){
        this.target = target;
        this.source = source;
        this.type = type;
        this.items = [];
        this.depends = [];
        this.pos = null;
        this.treeInit = false;
        this.objectType = YIUI.ExprItem_Type.Item;
    }

    _visibleItem.Head = 0;
    _visibleItem.Column = 1;
    _visibleItem.Operation = 2;
    _visibleItem.Row = 3;

    _visibleItem.prototype.setPos = function(pos){
        this.pos = pos;
    }

    _visibleItem.prototype.getPos = function() {
        return this.pos;
    }

    _visibleItem.prototype.getObjectType = function(){
        return this.objectType;
    }

    _visibleItem.prototype.setType = function(type){
        this.type = type;
    }

    _visibleItem.prototype.getType = function(){
        return this.type;
    }

    _visibleItem.prototype.setSource = function(source){
        this.source = source;
    }

    _visibleItem.prototype.getSource = function(){
        return this.source;
    }

    _visibleItem.prototype.setTarget = function(target){
        this.target = target;
    }

    _visibleItem.prototype.getTarget = function(){
        return this.target;
    }

    _visibleItem.prototype.addItem = function(item){
        this.items.push(item);
    }

    _visibleItem.prototype.getItem = function(index){
        return this.items[index];
    }

    _visibleItem.prototype.size = function(){
        return this.items.length;
    }

    _visibleItem.prototype.getItems = function(){
        return this.items;
    }

    _visibleItem.prototype.addDepends = function(depends){
        var self = this;
        depends.forEach(function(depend){
            self.addDepend(depend);
        });
    }

    _visibleItem.prototype.addDepend = function(depend){
        (this.depends.indexOf(depend) == -1) && this.depends.push(depend);
    }

    _visibleItem.prototype.getDepends = function(){
        return this.depends;
    }

    return _visibleItem;
})();

export var VisibleItemSet = (function(){

    var _visibleItemSet = function(source){
        this.source = source;
        this.items = [];
        this.objectType = YIUI.ExprItem_Type.Set;
    }

    _visibleItemSet.prototype.getObjectType = function(){
        return this.objectType;
    }

    _visibleItemSet.prototype.setSource = function(source){
        this.source = source;
    }

    _visibleItemSet.prototype.getSource = function(){
        return this.source;
    }

    _visibleItemSet.prototype.add = function(item){
        return this.items.push(item);
    }

    _visibleItemSet.prototype.get = function(index){
        return this.items[index];
    }

    _visibleItemSet.prototype.size = function(){
        return this.items.length;
    }

    _visibleItemSet.prototype.getItems = function(){
        return this.items;
    }

    _visibleItemSet.prototype.getItems = function(){
        return this.items;
    }

    return _visibleItemSet;
})();

//=======================EnableTree===========================

var EnableTree = (function(){

    var _enableTree = function(){
        this.items = [];
        this.affectItems = {};
    }

    _enableTree.prototype.getItems = function(){
        return this.items;
    }

    _enableTree.prototype.add = function(item) {
        this.items.push(item);
    }

    _enableTree.prototype.size = function(){
        return this.items.length;
    }

    _enableTree.prototype.get = function(index) {
        return this.items[index];
    }

    _enableTree.prototype.addAffect = function(key,itemSet){
        this.affectItems[key] = itemSet;
    }

    _enableTree.prototype.getAffect = function(key) {
        return this.affectItems[key];
    }

    _enableTree.prototype.sortAffect = function(){
        var affectItems = this.affectItems,keys = Object.keys(affectItems);
        keys.forEach(function(key){
            affectItems[key].sort();
        });
    }

    return _enableTree;
})();

var EnableAffectItemSet = (function(){

    var _enableAffectItemSet = function(source){
        this.source = source;
        this.items = [];
    }

    _enableAffectItemSet.prototype.setSource = function(source){
        this.source = source;
    }

    _enableAffectItemSet.prototype.getSource = function(){
        return this.source;
    }

    _enableAffectItemSet.prototype.getArray = function(){
        return this.items;
    }

    _enableAffectItemSet.prototype.add = function(item){
        if( this.items.indexOf(item) == -1 ) {
            this.items.push(item);
        }
    }

    _enableAffectItemSet.prototype.size = function(){
        return this.items.length;
    }

    _enableAffectItemSet.prototype.get = function(index){
        return this.items[index];
    }

    _enableAffectItemSet.prototype.sort = function(){
        var tmpItemArray = [];
        var lastSource = '';
        var itemSet = null;

        this.items.forEach(function(item){
            var source = item.getSource();
            if( lastSource == source ) {
                if( item.getType() == EnableItem.List ) {
                    if( itemSet == null ) {
                        itemSet = new EnableItemSet(source);
                        tmpItemArray.push(itemSet);
                    }
                    itemSet.add(item);
                } else {
                    tmpItemArray.push(item);
                    itemSet = null;
                }
            } else {
                if( item.getType() == EnableItem.List ) {
                    itemSet = new EnableItemSet(source);
                    itemSet.add(item);
                    tmpItemArray.push(itemSet);
                } else {
                    tmpItemArray.push(item);
                    itemSet = null;
                }
            }
            lastSource = source;
        });
        this.items = tmpItemArray;
    }

    return _enableAffectItemSet;
})();

export var EnableItem = (function(){

    var _enableItem = function(target,source,type){
        this.target = target;
        this.source = source;
        this.type = type;
        this.items = [];
        this.depends = [];
        this.treeInit = false;
        this.pos = null;
        this.objectType = YIUI.ExprItem_Type.Item;
    }

    _enableItem.Head = 0;
    _enableItem.List = 1;
    _enableItem.Operation = 2;

    _enableItem.prototype.setType = function(type){
        this.type = type;
    }

    _enableItem.prototype.getType = function(){
        return this.type;
    }

    _enableItem.prototype.getPos = function(){
        return this.pos;
    }

    _enableItem.prototype.setPos = function(pos){
        this.pos = pos;
    }

    _enableItem.prototype.setSource = function(source){
        this.source = source;
    }

    _enableItem.prototype.getSource = function(){
        return this.source;
    }

    _enableItem.prototype.setTarget = function(target){
        this.target = target;
    }

    _enableItem.prototype.getTarget = function(){
        return this.target;
    }

    _enableItem.prototype.addItem = function(item){
        this.items.push(item);
    }

    _enableItem.prototype.getItem = function(index){
        return this.items[index];
    }

    _enableItem.prototype.size = function(){
        return this.items.length;
    }

    _enableItem.prototype.getItems = function(){
        return this.items;
    }

    _enableItem.prototype.addDepends = function(depends){
        var self = this;
        depends.forEach(function(depend){
            self.addDepend(depend);
        });
    }

    _enableItem.prototype.addDepend = function(depend){
        (this.depends.indexOf(depend) == -1) && this.depends.push(depend);
    }

    _enableItem.prototype.getDepends = function() {
        return this.depends;
    }

    _enableItem.prototype.getObjectType = function(){
        return this.objectType;
    }

    return _enableItem;
})();

export var EnableItemSet = (function(){

    var _enableItemSet = function(source){
        this.source = source;
        this.items = [];
        this.objectType = YIUI.ExprItem_Type.Set;
    }

    _enableItemSet.prototype.getObjectType = function(){
        return this.objectType;
    }

    _enableItemSet.prototype.setSource = function(source){
        this.source = source;
    }

    _enableItemSet.prototype.getSource = function(){
        return this.source;
    }

    _enableItemSet.prototype.add = function(item){
        return this.items.push(item);
    }

    _enableItemSet.prototype.get = function(index) {
        return this.items[index];
    }

    _enableItemSet.prototype.getItems = function(){
        return this.items;
    }

    _enableItemSet.prototype.size = function() {
        return this.items.length;
    }

    return _enableItemSet;
})();

//=======================CheckTree============================

export var CheckTree = (function(){

    var _checkTree = function(){
        this.items = [];
        this.affectItems = {};
        this.globalItems = null;
        this.rowItems = null;
    }

    _checkTree.prototype.add = function(item){
        return this.items.push(item);
    }

    _checkTree.prototype.get = function(index) {
        return this.items[index];
    }

    _checkTree.prototype.size = function() {
        return this.items.length;
    }

    _checkTree.prototype.getItems = function() {
        return this.items;
    }

    _checkTree.prototype.addAffect = function(key,itemSet) {
        this.affectItems[key] = itemSet;
    }

    _checkTree.prototype.getAffect = function(key) {
        return this.affectItems[key];
    }

    _checkTree.prototype.setGlobalItems = function(globalItems){
        this.globalItems = globalItems;
    }

    _checkTree.prototype.getGlobalItems = function(){
        return this.globalItems;
    }

    _checkTree.prototype.setRowItems = function(rowKey,items) {
        if( this.rowItems == null ) {
            this.rowItems = {};
        }
        this.rowItems[rowKey] = items;
    }

    _checkTree.prototype.getRowItems = function(rowKey) {
        return this.rowItems && this.rowItems[rowKey];
    }

    _checkTree.prototype.sortAffect = function(){
        var affectItems = this.affectItems,keys = Object.keys(affectItems);
        keys.forEach(function(key){
            affectItems[key].sort();
        });
    }

    return _checkTree;
})();

export var CheckAffectItemSet = (function(){

    var _checkAffectItemSet = function(source){
        this.source = source;
        this.items = [];
    }

    _checkAffectItemSet.prototype.setSource = function(source){
        this.source = source;
    }

    _checkAffectItemSet.prototype.getSource = function(){
        return this.source;
    }

    _checkAffectItemSet.prototype.add = function(item){
        if( this.items.indexOf(item) == -1 ) {
            this.items.push(item);
        }
    }

    _checkAffectItemSet.prototype.size = function(){
        return this.items.length;
    }

    _checkAffectItemSet.prototype.get = function(index){
        return this.items[index];
    }

    _checkAffectItemSet.prototype.getArray = function(){
        return this.items;
    }

    _checkAffectItemSet.prototype.sort = function(){
        var tmpItemArray = [];
        var lastSource = '';
        var itemSet = null;

        this.items.forEach(function(item){
            var source = item.getSource();
            if( lastSource == source ) {
                if( item.getType() == CheckItem.List ) {
                    if( itemSet == null ) {
                        itemSet = new CheckItemSet(source);
                        tmpItemArray.push(itemSet);
                    }
                    itemSet.add(item);
                } else {
                    tmpItemArray.push(item);
                    itemSet = null;
                }
            } else {
                if( item.getType() == CheckItem.List ) {
                    itemSet = new CheckItemSet(source);
                    itemSet.add(item);
                    tmpItemArray.push(itemSet);
                } else {
                    tmpItemArray.push(item);
                    itemSet = null;
                }
            }
            lastSource = source;
        });
        this.items = tmpItemArray;
    }

    return _checkAffectItemSet;
})();

export var CheckItem = (function(){

    var _checkItem = function(target,source,type){
        this.type = type;
        this.source = source;
        this.target = target;
        this.required = false;
        this.errorMsg = '';
        this.items = [];
        this.depends = [];
        this.pos = null;
        this.treeInit = false;
        this.objectType = YIUI.ExprItem_Type.Item;
    }

    _checkItem.Head = 0;
    _checkItem.List = 1;
    _checkItem.Global = 2;

    _checkItem.prototype.setType = function(type){
        this.type = type;
    }

    _checkItem.prototype.getType = function(){
        return this.type;
    }

    _checkItem.prototype.getPos = function(){
        return this.pos;
    }

    _checkItem.prototype.setPos = function(pos){
        this.pos = pos;
    }

    _checkItem.prototype.setSource = function(source){
        this.source = source;
    }

    _checkItem.prototype.getSource = function(){
        return this.source;
    }

    _checkItem.prototype.setTarget = function(target){
        this.target = target;
    }

    _checkItem.prototype.getTarget = function(){
        return this.target;
    }

    _checkItem.prototype.setErrorMsg = function(msg){
        this.errorMsg = msg;
    }

    _checkItem.prototype.getErrorMsg = function(){
        return this.errorMsg;
    }

    _checkItem.prototype.isRequired = function(msg){
        return this.required;
    }

    _checkItem.prototype.setRequired = function(required){
        return this.required = required;
    }

    _checkItem.prototype.isEmpty = function(){
        return this.items.length = 0;
    }

    _checkItem.prototype.getObjectType = function(){
        return this.objectType;
    }

    _checkItem.prototype.addItem = function(item){
        this.items.push(item);
    }

    _checkItem.prototype.getItem = function(index){
        return this.items[index];
    }

    _checkItem.prototype.getItems = function(){
        return this.items;
    }

    _checkItem.prototype.addDepends = function(depends){
        var self = this;
        depends.forEach(function(depend){
            self.addDepend(depend);
        });
    }

    _checkItem.prototype.addDepend = function(depend){
        (this.depends.indexOf(depend) == -1) && this.depends.push(depend);
    }

    _checkItem.prototype.getDepends = function() {
        return this.depends;
    }

    return _checkItem;
})();

export var CheckItemSet = (function(){

    var _checkItemSet = function(source){
        this.source = source;
        this.items = [];
        this.objectType = YIUI.ExprItem_Type.Set;
    }

    _checkItemSet.prototype.getObjectType = function(){
        return this.objectType;
    }

    _checkItemSet.prototype.setSource = function(source){
        this.source = source;
    }

    _checkItemSet.prototype.getSource = function(){
        return this.source;
    }

    _checkItemSet.prototype.add = function(item){
        return this.items.push(item);
    }

    _checkItemSet.prototype.get = function(index) {
        return this.items[index];
    }

    _checkItemSet.prototype.getItems = function(){
        return this.items;
    }

    _checkItemSet.prototype.size = function() {
        return this.items.length;
    }

    return _checkItemSet;
})();

//=======================ParaTree=============================
var ParaTree = (function(){

    var _paraTree = function(form){
        this.form = form;
        this.items = [];
        this.affectItem = {};
    }

    _paraTree.prototype.build = function(){
        var self = this,paras = this.form.metaForm.paraCollection;
        if( paras ) {
            paras.forEach(function(p){
                var para = $.extend({},p);
                self.items.push(para);
                var dep = para.dependency;
                if( dep && dep.trim().length > 0) {
                    dep.trim().split(',').forEach(function(depend){
                        var list = self.affectItem[depend];
                        if( !list ) {
                            list = [];
                            self.affectItem[depend] = list;
                        }
                        list.push(para);
                    });
                }
            });
        }
        return this;
    }

    return _paraTree;
})();

//========================Variant=============================

var Variant = (function(){

    var __defaultValue = "DefaultValue";
    var __defaultFormula = "DefaultFormulaValue";
    var __formulaDep = "ValueDependency";

    var __enable = "Enable";
    var __enableDepend = "EnableDependency";

    var __visible = "Visible";
    var __visibleDepend = "VisibleDependency";

    var __checkRule = "CheckRule";
    var __checkRuleDep = "CheckDependency";

    var __errorInfo = "ErrorInfo";
    var __required = "Required";

    var __valueChanged = "ValueChanged";

    var _variant = function(data){
        this.data = data;
    }

    _variant.override = 1;
    _variant.addition = 2;

    _variant.prototype.getDefaultValue = function(key,defaultValue) {
        return this.getImpl(__defaultValue,key,defaultValue);
    }

    _variant.prototype.getFormulaValue = function(key,defaultValue) {
        return this.getImpl(__defaultFormula,key,defaultValue);
    }

    _variant.prototype.getFormulaDep = function(key,defaultValue) {
        return this.getImpl(__formulaDep,key,defaultValue);
    }

    _variant.prototype.getRequired = function(key,defaultValue) {
        return this.getImpl(__required,key,defaultValue).toString() == 'false' ? false : true;
    }

    _variant.prototype.getErrorInfo = function(key,defaultValue) {
        return this.getImpl(__errorInfo,key,defaultValue);
    }

    _variant.prototype.getEnable = function(key) {
        return this._getImpl(__enable,key);
    }

    _variant.prototype.getEnableDep = function(key) {
        return this._getImpl(__enableDepend,key);
    }

    _variant.prototype.getVisible = function(key) {
        return this._getImpl(__visible,key);
    }

    _variant.prototype.getVisibleDep = function(key) {
        return this._getImpl(__visibleDepend,key);
    }

    _variant.prototype.getCheckRule = function(key) {
        return this._getImpl(__checkRule,key);
    }

    _variant.prototype.getCheckRuleDep = function(key) {
        return this._getImpl(__checkRuleDep,key);
    }

    _variant.prototype.getValueChanged = function(key) {
        return this._getImpl(__valueChanged,key);
    }

    _variant.prototype.getImpl = function(field,key,defaultValue) {
        var o = this.data[field]; // 大类
        if( !o ) return defaultValue;
        var item = o[key];
        if( !item ) return defaultValue;
        return item.values.length > 0 ? item.values[0] : defaultValue;
    }

    _variant.prototype._getImpl = function(field,key) {
        var o = this.data[field]; // 大类
        if( o && o[key] ) {
            return new VariantItem(o[key]);
        }
        return null;
    }

    return _variant;
})();

var VariantItem = (function(){

    var _variantItem = function(o){
        this.option = o.option;
        this.values = o.values;   
    }

    _variantItem.prototype.size = function(){
        return this.values.length;
    }

    _variantItem.prototype.getValue = function(index) {
        return this.values[index];
    }

    _variantItem.prototype.getValues = function() {
        return this.values;
    }

    _variantItem.prototype.getOption = function() {
        return this.option;
    }

    return _variantItem;
})();

//==========================Pos && Item=======================

export var ExprItemPos = (function(){

    var _exprItemPos = function(){
        this.columnExpand = false;
        this.index = -1;
        this.indexes = [];
    }

    _exprItemPos.prototype.setColumnExpand = function(columnExpand){
        this.columnExpand = columnExpand;
    }

    _exprItemPos.prototype.isColumnExpand = function(){
        return this.columnExpand;
    }

    _exprItemPos.prototype.setIndex = function(index){
        this.index = index;
    }

    _exprItemPos.prototype.getIndex = function(){
        return this.index;
    }

    _exprItemPos.prototype.getIndexes = function(){
        return this.indexes;
    }

    _exprItemPos.prototype.setIndexes = function(indexes){
        this.indexes = indexes;
    }

    return _exprItemPos;
})();

export var Item = (function(){

    var _item = function(content){
        this.content = content;
        this.syntaxTree = null;
    }

    _item.prototype.setContent = function(content){
        this.content = content;
    }

    _item.prototype.getContent = function(){
        return this.content;
    }

    _item.prototype.setTree = function(tree){
        this.syntaxTree = tree;
    }

    _item.prototype.getTree = function(){
        return this.syntaxTree;
    }

    return _item;
})();

export default FormDepend;
