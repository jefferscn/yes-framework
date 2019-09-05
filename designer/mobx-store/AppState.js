import React from 'react';
import { observable, runInAction, action, computed } from 'mobx';
import Access from './access';
import { fromPromise } from 'mobx-utils';

export const FILE_TYPE = {
    BILLFORM:1,
    CONTROL:2,
    PROJECTCFG:3,
    LOGINCFG:4,
    ROUTECFG:5,
};
const defaultFormTemplate = `{
    "formTemplate": "void"
}
`

const fileCompare = (a1,a2)=>{
                if(a1.isDirectory===a2.isDirectory) {
                    const str1 = a1.name.toLowerCase();
                    const str2 = a2.name.toLowerCase();
                    if(str1>str2) {
                        return 1;
                    } else {
                        return str1<str2?-1:0;
                    }
                }
                if(a1.isDirectory) {
                    return -1;
                }
                return 1;
            };

export class Project {
    @observable files = [];
    billforms
    access;
    constructor(access) {
        this.access = access;
    }
    @action reload = async () => {
        // 加载整个项目的结构
        runInAction(()=>{
            this.files = [];
            // 1. 加载单据配置目录
            this.billforms = new ProjectFile(this.access, '单据', '//config/billforms', true, FILE_TYPE.BILLFORM, true);
            this.files.push(this.billforms);
            // 2. 加载控件目录
            this.files.push(new ProjectFile(this.access, '控件', '//config/controls', true, FILE_TYPE.CONTROL, true));
            // 3. 加载项目配置文件
            this.files.push(new ProjectFile(this.access, '项目配置(正式)', '//config/project.json', false, FILE_TYPE.PROJECTCFG, true));
            this.files.push(new ProjectFile(this.access, '项目配置(测试)', '//config/project.debug.json', false, FILE_TYPE.PROJECTCFG, true));
            // 4. 加载首页配置文件
            this.files.push(new ProjectFile(this.access, '路由配置', '//config/route.json', false, FILE_TYPE.ROUTECFG, true));
            // this.files.push(new ProjectFile(this.access, '首页配置', '//config/initialPage.json', false));
            // 5. 加载登录界面配置文件
            this.files.push(new ProjectFile(this.access, '登录配置', '//config/login.json', false, FILE_TYPE.LOGINCFG, true));
            this.files = this.files.sort(fileCompare);
        });
        // const data = await this.access.fetchMeta('/');
        // runInAction(() => {
        //     this.files = [];
        //     for (const v of data) {
        //         this.files.push(new ProjectFile(this.access, v.filename, v.path, v.isDirectory));
        //     }
        //     this.files = this.files.sort(fileCompare);
        // });
    }
    @action
    async addBillForm(formKey) {
        // runInAction(()=> {
            const file = this.billforms.addFile(`${formKey}.json`);
            // file.content = defaultFormTemplate; 
            await file.commitContent(defaultFormTemplate);
            await file.save();
        // })
    }
    async getProjectFile(path) {
        if(this.files.length===0) {
            await this.reload();
        }
        const f = this.files.find((file)=>path.startsWith(file.path));
        if(f) {
            return f.getChild(path);
        }
        return null;
    }
    async expandPath(path) {
        for(const f of this.files) {
            await f.expandPath(path);
        }
    }
}

export class ProjectFile {
    @observable name;
    @observable children = [];
    @observable content = null;
    @observable path;
    @observable originContent = null;
    @observable dirty = false;
    @observable isLoading = false;
    @observable expand = false;
    @observable type = '';
    @observable reserve = false;
    loaded = false;
    access = null;
    isDirectory;
    constructor(access, name, path, isDirectory, type, reserve = false) {
        this.access = access;
        this.name = name;
        this.path = path;
        this.isDirectory = isDirectory;
        this.type = type;
        this.reserve = reserve;
    }
    @action addFile(file) {
        const result = new ProjectFile(this.access, file, `${this.path}/${file}`, false, this.type);
        this.children.push(result);
        return result;
    }
    @action addDirectory(dir) {
        this.children.push(new ProjectFile(dir, `${this.path}/${dir}`, true));
    }
    @action reloadContent = async () => {
        runInAction(()=>{
            this.loading = true;
        })
        const data = await this.access.fetchContent(this.path);
        runInAction(() => {
            this.content = data;
            this.loading = false;
            this.loaded = true;
        })
    }
    @action commitContent(content) {
        this.originContent = this.content;
        this.content = content
        this.dirty = true;
    }
    @action toggleExpand = async () => {
        runInAction(()=>{
            this.expand = !this.expand;
        })
        if(this.expand && !this.loaded) {
            await this.loadChildren();
        }
    }
    @action save = async () => {
        await this.access.deployContent(this.path, this.content);
        this.dirty = false;
    }
    @action loadChildren = async () => {
        runInAction(()=>{
            this.loading = true;
        })
        const data = await this.access.fetchMeta(this.path);
        runInAction(() => {
            this.children = [];
            for (const v of data) {
                this.children.push(new ProjectFile(this.access, v.filename, v.path, v.isDirectory, this.type));
            }
            this.children= this.children.sort(fileCompare);
            this.loading = false;
            this.loaded = true;
        });
    }
    async getChild(path) {
        if(this.path === path) {
            return this;
        }
        if(this.isDirectory && !this.loaded) {
            await this.loadChildren();
        }
        const child = this.children.find((file)=>`${path}/`.startsWith(`${file.path}/`));
        if(child) {
            return child.getChild(path);
        }
        return null;
    }
    @action
    expandPath = async(path) => {
        if(this.isDirectory && path.startsWith(this.path) && path!==this.path) {
            this.expand = true;
            if(!this.loaded) {
                await this.loadChildren();
            }
            for(const f of this.children) {
                await f.expandPath(path);
            }
        }
    }
}

export default class AppState {
    @observable project = null;
    @observable selected = null;
    @observable formIds = {};
    @observable fileType = null; 
    @observable selectedFormKey = null; 
    @observable selectedControl = null;
    @observable meta = null;
    @observable toolbarVisible=false;
    constructor() {
        this.project = new Project(new Access('/file'));
    }
    @computed get projectConfig() {
        const path = `//config/project.json`;
        return fromPromise(this.project.getProjectFile(path));
    }
    @action 
    select(item) {
        if(this.selected === item) {
            return;
        }
        this.selected = item;
        this.project.expandPath(item.path);
        if(item.path.startsWith('//config/billforms/')) {
            const formKey = item.name.split('.')[0];
            this.fileType = 'form';
            this.selectedFormKey = formKey;
        } else {
            this.fileType = 'json';
        }
        this.selectedControl = null;
        this.meta = null;
    }
    @action
    selectControl(control, meta) {
        this.selectedControl = control;
        this.meta = meta;
    }
    @action 
    async selectFormKey(formKey) {
        const path = `//config/billforms/${formKey}.json`;
        this.selected = await this.project.getProjectFile(path);
        this.selectedControl = null;
        this.selectedFormKey = formKey;
        this.fileType = 'form';
        this.project.expandPath(path);
    }
    @action
    async openForm(formKey, oid, status) {
        const path = `//config/billforms/${formKey}.json`;
        const f =  await this.project.getProjectFile(path);
        runInAction(() => {
            this.formIds[formKey] = oid;
            this.selected = f; 
            this.selectedControl = null;
            this.fileType = 'form';
            this.selectedFormKey = formKey;
            this.project.expandPath(path);
        });
    }
    async getRouteCfg() {
        const path = `//config/route.json`;
        const f =  await this.project.getProjectFile(path);
        return f;
    }
    async getLoginCfg() {
        const path = '//config/login.json';
        const f =  await this.project.getProjectFile(path);
        return f;
    }
    async getBillForm(formKey) {
        const path = `//config/billforms/${formKey}.json`;
        const f =  await this.project.getProjectFile(path);
        return f;
    }
    @action
    setFormId(formKey, id) {
        this.formIds[formKey] = id;
    }
}
