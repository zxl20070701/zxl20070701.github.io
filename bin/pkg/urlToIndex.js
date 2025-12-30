let urls = [];

module.exports = function (url) {

    let index = urls.indexOf(url);

    if (index > -1) return index;

    urls.push(url);
    return urls.length - 1;

};