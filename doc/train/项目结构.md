# 项目结构文件功能描述

## .storybook

    storybook配置目录

## .config

    webpack配置目录

## doc

    部分文档，后续会被转移到github的wiki

## .bablerc

    babel配置文件

## entry.js

    项目入口文件

## gulpfile.babel.js

    编译命令文件

## index.html

    项目首页html文件

## initializationLoading.css, initializationLoading.js

    初始加载功能文件，用于在加载js的时候给用户一个加载中的提示

## main.js

    初始加载入口，用于加载entry.js，同时给用户一个加载提示

## package.json

    npm依赖包描述


## src

    项目代码主目录

* AppWrapper.js

    项目顶层控件，用于提供设备相关功能，项目中的很多配置都是在这里被引入的。

* config.js

    App控件的配置

* DynamicView.js

    react-navigation中使用的视图控件，这个控件是react-navigation视图和yigo单据的关联控件

* EntryView.js

    待定，与DynamicView功能相似，只是这个控件是使用设计器中的入口作为参数

* index.js

    这个文件返回一个App控件

* TemplateView.js

    模板视图，这个控件使用模板的方式渲染yigo的单据

* WorkitemView.js

    yigo工作项视图，也是react-navigation的视图，使用workitemID作为参数

* config

    项目配置目录，项目中几乎所有的配置都在这个目录下，当前这个目录下的文件
    都是配置的中介，便于在框架代码中引用项目配置，实际的配置被转移到了项目目录下.  

    * control.js

        加载框架中的所有控件，controls目录下的文件会被自动加载

    * index.js

        导出项目所有配置

    * billforms

        单据配置,当前这个目录也是一个对项目中单据配置的一个引用，没有实际配置

* controls

    框架自带的控件(后期将把所有控件移到一个独立的库中)

    * ActionButton
    
        在单据下部中间位置一个加号按钮,这个控件只是形式，无法在配置中直接使用

    * AdvanceFilterBlock

    * AppStatusWrap

        一个高阶组件用于提供应用级别得信息，主要是版本相关的信息

    * AttachmentAction

        一个完成上传附件得按钮

    * AttachmentList

        一个附件列表得展示控件

    * AttachmentTextImage

    * AutofitScrollView

    * BadgeText

        文本控件角标显示控件

    * BarcodeScannerText

        支持二维码扫描的文本控件

    * ButtonActionButton

        在单据下部中间显示一个加号按钮，点击之后模拟一个按钮的点击

    * ButtonClick

        按钮点击控件可以和其他渲染控件配合，完成通过配置完成单据按钮模拟点击的效果

    * Card

        一个卡片控件

    * CarouselGrid

        一个表格的轮播图渲染控件

    * CellLayoutGridView

        一个表格的渲染控件，行使用CellLayoutTemplate来渲染

    * CheckboxLabel

        一个checkbox的文本渲染控件

    * ControlList

        一个纯文本的控件列表渲染控件，使用列形式渲染

    * DateFromTo

        一个日期范围控件

    * DecimalFromTo

        一个数据范围控件

    * ComboboxSelect

        一个用于直接显示Combobox选择界面的控件，在某些特定情况下使用(不关心选择结果)

    * EntryRightWrap

        一个支持入口权限的高阶组件，使用这个控件包装的控件会根据入口权限来判断可见性

    * FilterBlock

        一个容器用于横向显示一组被用作过滤的控件，一般配置单据上的查询模块

    * FlexBox

        一个flex布局的控件

    * FormTitle

        一个动态显示单据Title的控件

    * GpsText

        一个用于获取当前Gps数据的文本控件

    * GridActionButton

        在单据下部中间显示一个加号按钮，点击的效果是新增一个表格行

    * GridBatchOperate

        表格批量处理控件

    * GridImageViewer

    * GridRow

        一个表格行渲染控件

    * GridRowCountLimit

        一个表格行数量控制控件，可以使用行数量来控制其他控件的可见性

    * GridSelect

        行选择控件

    * GridSelectAndPost

        一个表格行按钮控件的渲染，效果是点之后选择本行，并执行对应按钮点击事件

    * GridTotal

        一个高阶组件,表格汇总信息,开发其他控件如果需要一个表格的汇总信息可以使用这个控件

    * GridView

        一个表格渲染控件

    * Header

        表格头控件

    * IconButton

        一个图标按钮渲染控件(无法直接在配置中使用)

    * Image

        一个图片控件渲染

    * ImageCarouselGrid

        表格数据的轮播图渲染控件

    * ListText

        一个简易文本渲染控件(不支持编辑，仅用于显示)

    * ListView

        列表控件渲染实现

    * Login

        默认登录界面控件

    * MapText

        一个文本的地图渲染控件，用于那些以地址为内容的文本控件

    * MoneyWithCurrency

        一个带币种的金额显示控件

    * MonthPicker

        月份选择控件

    * OpenFormActionButton

        单据下部中间显示的一个加号按钮，点击的效果是打开一个单据

    * OperationExecTimer

        一个定时执行操作的控件 

    * PlainGrid

        一个表格的行列形式表格控件

    * PopoverCombobox

        一个popover形式的Combobox控件

    * QueryContainer

        一个过滤控件容器

    * Rating

        一个评分控件,可以用于数字控件
    
    * ScriptWrap

        一个脚本代理控件，与纯渲染控件配合，可以实现执行脚本的功能(这个功能需要谨慎使用，因为业务应尽量在单据配置中实现)

    * Searchbar

        一个查询控件(使用antd-mobile的Searchbar)

    * SectionList

        一个表格控件的分组渲染控件

    * SegementButtons

        Segement形式显示一组按钮控件

    * SegementCombobox

        Segement形式显示Combobox控件

    * SegementToolbar

        Segement形式显示Toolbar控件

    * Seperator

        一个分割线控件

    * SplitText

        一个用于显示文本控件中一部分信息的控件

    * Stepper

        一个数字控件的步进渲染

    * Switch

        checkbox控件的Switch渲染
    
    * TagCombobox

        combobox控件的Tag形式渲染

    * TreeDict

        树状字典控件渲染

    * Update

        一个用于更新App的控件

    * VisibleEqual

        一个用于代理控件，用于控制子控件是否显示，当指定控件的值和设置一致的时候可见

    * VisibleFormEditable

        一个用于代理控件，用于控制子控件是否显示，当单据可编辑的时候可见

    * VisibleNotEqual

        一个用于代理控件，用于控制子控件是否显示，当指定控件值和设置不同的时候可见

    * VisibleRelated

        一个用于代理控件，用于控制子控件是否显示，当指定控件可见的时候可见

    * VisibleRelatedDisabled

        一个用于代理控件，用于控制子控件是否显示，当指定控件不可用的时候可见

* demo

    一个演示项目的实现目录

* font

    图标目录,这个目录中包含一个图标控件，可以在框架中使用。

* i18n

    多语言目录，当前只有zh-CN和en_US两个文件

* openwith

    Cordova中OpenWith插件的加载实现，用于在App中实现外部文件打开方式。

* patch

    对一些第三方组件的改动都放在这里，当前只有antd-mobile.css这个patch

* preload

    这个目录用于支持yigo平台的预加载单据功能。

* project

    项目代理目录，这个目录中的index.js是实际项目的一个引用。

* projects

    实际项目建议放到这个目录，这个目录不在git代码中，不会被提交

* providers

    这个目录包含了对各个设备的支持，包括了Appcan,Cordova,Wechat。

* push

    这个目录是推送功能的实现，当前支持baidu推送和jpush

* route

    react-navigation的路由实现，其中包含了对yigo单据的默认路由

* SiblingMgr

    这个目录中包含了模态表单的实现，主要是由于react-navigation没有很好的模态视图实现。

* stories

    storybook的代码,框架中控件和模板的演示代码都在这里

* template

    框架中核心的模板实现目录

    * AutoTempalte

        是一个单页，列状，Element列表控件

    * CustomTemplate

        自定义单据模板，这种模板针对完全自定义的单据实现

    * DynamicTemplate

        使用设计器中设计的单据布局(一般不用)
    
    * ListTemplate

        一个对应列表控件的单据模板(一般用在单据列表界面)

    * ModalTemplate

        模态模板

    * NormalTemplate

        单页面控件列状模板(使用CellLayout)

    * TabTemplate

        多页面模板，每个页面内容和NormalTemplate一致

* util

    一些系统中常用的工具函数，其中fakeFetch是用来代理系统fetch函数的

* yigopatch

    yigo平台patch的存放目录，当前的内容主要是对yigo3的支持



