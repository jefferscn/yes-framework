import { UI, View, YIUI, Svr, DataDef, cacheSystem } from 'yes-core';
import { AppDispatcher, BillformStore as BillFormStore, Util } from 'yes';
// import { History } from 'yes-platform';
// import { isCordova, isWeixin, isBrowser } from "yes/dist/components/Env";


View.FuncMap.put('DownloadAttachment',
    async function (name, cxt, args) {
        const form = cxt.form;

        const tableKey = YIUI.TypeConvertor.toString(args[1]);

        let path = '';
        if (args.length > 2) {
            path = YIUI.TypeConvertor.toString(args[2]);
        }

        let provider = '';
        if (args.length > 3) {
            provider = YIUI.TypeConvertor.toString(args[3]);
        }

        const grid = form.getDocument().getByKey(tableKey);
        let rowIndex = -1;
        if (grid) {
            rowIndex = cxt.rowIndex;
        }

        // 如果给定路径,使用给定路径,否则从数据表中取得
        if (!path) {
            var doc = form.getDocument(),
                tbl = doc.getByKey(tableKey);
            if (tbl.tableMode == YIUI.TableMode.DETAIL) {
                var row = grid.rows[rowIndex];
                if (YIUI.GridUtil.isEmptyRow(row))
                    return;
                tbl.setByBkmk(grid.rows[rowIndex].bkmk);
            } else {
                tbl.first();
            }
            path = tbl.getByKey(YIUI.Attachment_Data.PATH);
        }

        if (!path)
            return;
        const filename = path.split('/').pop();
        const options = {
            formKey: form.formKey,
            tableKey: tableKey,
            provider: provider,
            path: encodeURIComponent(path),// 不是完整的URI,使用encodeURIComponent,可能含有保留字符"+"等
            mode: 2,
            service: 'DownloadAttachment'
        };
        const fileData = await downLoadFile(filename, options);
        var url = window.URL.createObjectURL(fileData);
		console.log(url);
		var fileLink = document.createElement('a');
		fileLink.innerHTML = filename;
        // 指定生成的文件名
        fileLink.download = filename;
		fileLink.href = url;
		fileLink.target = '_blank';
		document.body.appendChild(fileLink);
		fileLink.click();
		document.body.removeChild(fileLink);
        return true;
    }
)

const downLoadFile = async (filename, options = {}) => {
	const url = Svr.SvrMgr.AttachURL;
	let data = new FormData();
	for (let key in options) {
		data.append(key, options[key]);
	}
	const request = {
		method: 'post',
		credentials: 'include',
		body: data
	};
	const response = await fetch(url, request);
	let blob = await response.blob();
	blob.name = blob.name || filename;

	AppDispatcher.dispatch({
		type: 'attachmentPreview',
		file: blob
	});
	return blob;
};

