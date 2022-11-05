export default function (handle) {

    var folderLst = [], fileLst = [];
    return new Promise(function (resolve, reject) {
        var asyncIterable = handle.entries();

        // 或者使用： for await (const entry of handle.entries()) { }
        (function doNext() {
            asyncIterable.next().then(function (data) {
                if (!data.done) {

                    // 文件夹
                    if (data.value[1].kind == 'directory') {
                        folderLst.push({
                            name: data.value[0],
                            isDirectory: "yes",
                            handle: data.value[1]
                        });
                    }

                    // 文件
                    else {
                        fileLst.push({
                            name: data.value[0],
                            isDirectory: "no",
                            handle: data.value[1]
                        });
                    }


                    doNext();
                } else {
                    var list = folderLst;
                    for (var index = 0; index < fileLst.length; index++) {
                        list.push(fileLst[index]);
                    }
                    resolve(list);
                }
            });
        })();

    });
};