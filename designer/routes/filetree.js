import express from 'express';
import path from 'path';
import multer from 'multer';
import { jsonResult, readdir, stat, writeFile, deleteFile, mkdir } from './util';

function filetree(directory) {
    const router = express.Router();
    const upload = multer({ desc: directory });
    /**
     * 获取文件列表
     */
    router.post('/', async (req, res, next) => {
        try {
            const p = req.body.path || '/';
            const dir = path.join(directory, p);
            const files = await readdir(dir);
            const result = [];
            for(const f of files) {
                const info = await stat(path.join(dir, f));
                const pp = `${p}/${f}`;
                if(info.isDirectory()) {
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
        } catch(ex) {
            console.log(ex);
            res.json(jsonResult(false, ex));
            next();
        }
    });
    /**
     * 获取文件内容
     */
    router.post('/file', (req, res, next) => {
        const fileKey = req.body.key;
        let fileName = path.join(directory, fileKey);
        res.sendFile(fileName);
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
    return router;
}

module.exports = filetree;
