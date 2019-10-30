import fs from 'fs';
var ncp = require('ncp').ncp;
import npm from "npm";

export function copydir(from, to) {
    return new Promise((resolve, reject) => {
        ncp(from, to, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

export function readfile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        })
    })
}

export function readdir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
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
            if (err) {
                reject(err);
                return;
            }
            resolve(info);
        });
    });
}

export function writeFile(file, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, {}, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        })
    });
}

export function mkdir(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) {
                rejct(err);
            } else {
                resolve();
            }
        });
    });
}

export function deleteFile(file) {
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                rejct(err);
            } else {
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
    if (success) {
        result.data = data;
    } else {
        result.error = data;
    }
    return result;
}

export function npmLoad() {
    return new Promise((resolve, reject) => {
        npm.load({
            loaded: false,
            save: true,
        }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    })
}

export function npmInstall(path, dependencies) {
    return new Promise((resolve, reject) => {
        npm.commands.install(path, dependencies, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

export function webpackClose(instance) {
    return new Promise((resolve, reject) => {
        instance.close(() => {
            resolve();
        })
    });
}
