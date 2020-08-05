开发过程指引
=========================================

YIGO服务器端改动
----------------------------------------

 用于开发的YIGO服务器需要支持跨域，正式使用的服务器不需要


开发端
----------------------------------------

1. 下载最新版本的yes-framework

    git clone -b update https://github.com/jefferscn/yes-framework.git

    cd yes-framework

    npm install

2. 创建项目目录

    src/project/emptyProject这个目录中是一个空项目，复制到src目录下任意位置，建议就直接放到src目录下，目录名字随意，然后修改src/project/index.js文件，引入新建的项目目录

    ```
        export * from './emptyProject';
    ``` 

3. 修改项目配置文件(config/project.json)

    最主要是填写serverPath这个属性，填写yigo服务器的根地址即可

4. 开启开发环境

    在yes-framework根目录下，运行npm start,启动完成之后在浏览器中打开http://localhost

5. 开发单据配置

6. 打包

     在yes-framework根目录下，运行npm run build,完成之后根目录下会出现一个build目录，其中有一个zip文件可以用于在打包网站上作为上传文件进行上传打包。

发布
--------------------------------------

1. 访问[打包网站](http://dev.bokesoft.com/erpmobile/)

2. 新建项目

    正常填写项目信息，其中上传的图标必须是长宽等比的png格式的图片,项目设置页中可以定义调试的服务器地址和正式的服务器地址，这要打包的时候可以不用考虑服务器地址。IOS页面中需要上传打包需要的相关证书。

3. 新建任务

    新建任务的过程比较简单，只需要注意，IOS打包的时候如果没有上传开发证书，则只能选择非调试方式进行打包。

