import express from 'express';
import path from 'path';
import multer from 'multer';
import unzip from 'unzip2';
import { jsonResult, readdir, stat, writeFile, deleteFile, mkdir, readfile, copydir, npmLoad, npmInstall, webpackClose } from './util';
import npm from "npm";
import fs from 'fs';

function filetree(projectPath, directory, instance) {
    const router = express.Router();
    const upload = multer({ dest: path.join(directory, 'upload') });
    /**
     * 获取文件列表
     */
    router.post('/', async (req, res, next) => {
        try {
            const p = req.body.path || '/';
            const dir = path.join(directory, p);
            const files = await readdir(dir);
            const result = [];
            for (const f of files) {
                const info = await stat(path.join(dir, f));
                const pp = `${p}/${f}`;
                if (info.isDirectory()) {
                    result.push({
                        filename: f,
                        path: pp,
                        isDirectory: true,
                    });
                } else {
                    result.push({
                        filename: f,
                        path: pp,
                        isDirectory: false,
                    })
                }
            };
            res.json(jsonResult(true, result));
            next();
        } catch (ex) {
            console.log(ex);
            res.json(jsonResult(false, ex));
            next();
        }
    });
    /**
     * 获取文件内容
     */
    router.post('/file', async (req, res, next) => {
        const fileKey = req.body.key;
        let fileName = path.join(directory, fileKey);
        res.sendFile(fileName, {}, (err) => {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', fileName);
                res.end();
            }
        });
    });
    /**
     * 提交文件变动
     */
    router.post('/deploy', async (req, res, next) => {
        const { key, content } = req.body;
        let fileName = path.join(directory, key);
        await writeFile(fileName, content);
        res.end();
    });
    router.post('/addfile', async (req, res, next) => {
        const { key, content } = req.body;
        let fileName = path.join(directory, key);
        await writeFile(fileName, content);
        res.end();
    });
    router.post('/removefile', async (req, res, next) => {
        const { key } = req.body;
        let fileName = path.join(directory, key);
        await deleteFile(fileName);
        res.end();
    });
    router.post('/adddir', async (req, res, next) => {
        const { key } = req.body;
        let fileName = path.join(directory, key);
        await mkdir(fileName);
        res.end();
    });
    router.post('/removedir', async (req, res, next) => {

    });
    /**
     * 导入控件
     */
    router.post('/import/control', upload.single('file'), async (req, res, next) => {
        const file = req.file;
        if (file.mimetype !== 'application/zip') {
            res.json(jsonResult(false, 'only support zip file'));
            res.end();
            return;
        }
        try {
            await extract(file.path, path.join(directory, 'temp', file.originalname));
        } catch (ex) {
            res.json(jsonResult(false, ex));
            res.end();
            return;
        }
        try {
            const dependencyFile = path.join(directory, "temp", file.originalname, "dependency");
            const dependencyData = await readfile(dependencyFile);
            console.log(dependencyData);
            const dependencies = dependencyData ? dependencyData.split(',') : null;
            await webpackClose(instance);
            //执行目录下的dependency文件中的脚本
            if (dependencies) {
                await npmLoad();
                await npmInstall(projectPath, dependencies);
            }
            await copydir(path.join(directory, "temp", file.originalname, "script"), path.join(directory, "config", "controls", file.originalname.split('.')[0]));
            instance.invalidate();
            res.json(jsonResult(true));
        } catch (ex) {
            res.json(jsonResult(false, ex));
            res.end();
            return;
        }
        //复制readme.md到控件目录中
    });
    router.post('/import/template', upload.single('file'), async (req, res, next) => {
        const file = req.file;
        if (file.mimetype !== 'application/zip') {
            res.json(jsonResult(false, 'only support zip file'));
            res.end();
            return;
        }
        try {
            await extract(file.path, path.join(directory, 'temp', file.originalname));
        } catch (ex) {
            res.json(jsonResult(false, ex));
            res.end();
            return;
        }
        try {
            const dependencyFile = path.join(directory, "temp", file.originalname, "dependency");
            const dependencyData = await readfile(dependencyFile);
            console.log(dependencyData);
            const dependencies = dependencyData ? dependencyData.split(',') : null;
            await webpackClose(instance);
            //执行目录下的dependency文件中的脚本
            if (dependencies) {
                await npmLoad();
                await npmInstall(projectPath, dependencies);
            }
            await copydir(path.join(directory, "temp", file.originalname, "script"), path.join(directory, "config", "templates", file.originalname.split('.')[0]));
            instance.invalidate();
            res.json(jsonResult(true));
        } catch (ex) {
            res.json(jsonResult(false, ex));
            res.end();
            return;
        }
    });
    const extract = (file, dir) => {
        return new Promise((resolve, reject) => {
            var res = fs.createReadStream(file).pipe(unzip.Extract({ path: dir }));
            res.on('error', (error) => {
                reject(error);
            });
            res.on('close', () => {
                resolve();
            });
        });
    }
    return router;
}

module.exports = filetree;
