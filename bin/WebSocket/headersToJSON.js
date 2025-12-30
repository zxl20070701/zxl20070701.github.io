module.exports = function (headersStr) {

    let headersArray = headersStr.split(/\r{0,1}\n/);
    let headersJSON = {};

    // 第一行的内容：GET / HTTP/1.1
    let firstLine = headersArray.shift().split(' ');
    headersJSON.method = firstLine[0];
    headersJSON.url = firstLine[1];
    headersJSON.protocol = firstLine[2];

    for (let item of headersArray) {
        let temp = item.split(':');

        if (temp.length > 1) {

            let key = temp.shift();
            let value = temp.join(':');

            headersJSON[key] = value.trim();

        }
    }

    return headersJSON;
};
