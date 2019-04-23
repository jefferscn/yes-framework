import fs from 'fs';

export function readdir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

export function stat(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, info) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(info);
        });
    });
}

export function writeFile(file, content) {
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, content, {}, (err)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(true);
        })
    });
}

export function mkdir(path) {
    return new Promise((resolve, reject)=> {
        fs.mkdir(path, { recursive: true }, (err) => {
            if(err) {
                rejct(err);
            }else {
                resolve();
            }
        });
    });
}

export function deleteFile(file) {
    return new Promise((resolve, reject)=> {
        fs.unlink(file, (err)=>{
            if(err) {
                rejct(err);
            }else {
                resolve();
            }
        });
    });
}

export function deleteDir(file) {

}

export function jsonResult(success, data) {
    const result = {
        success,
    };
    if(success) {
        result.data = data;
    } else {
        result.error = data;
    }
    return result;
}
