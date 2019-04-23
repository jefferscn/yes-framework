import EventEmitter from 'eventemitter3';

export default class Access extends EventEmitter{
    metaUrl;
    contentUrl;
    removeUrl;
    saveUrl;
    changeNameUrl;
    constructor(url) {
        super();
        this.metaUrl = url;
        this.contentUrl = `${url}/file`;
        this.removeUrl = `${url}/remove`;
        this.saveUrl = `${url}/deploy`;
        this.changeNameUrl = `${url}/changename`;
    }

    fetchMeta = async (path)=> {
        const data = await fetch(this.metaUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                path,
            }),
        });
        const json = await data.json();
        if(json.success) {
            return json.data;
        }
        throw json.error;
    }

    fetchContent = async (file) => {
        const data = await fetch(this.contentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                key: file,
            }),
        });
        return data.text();
    }

    deployContent = async(file, content) => {
        await fetch(this.saveUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                key: file,
                content,
            })
        });
    }
}