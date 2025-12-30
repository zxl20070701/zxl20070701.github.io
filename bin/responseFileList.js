const fs = require('fs');
const path = require('path');

// 读取当前路径下的文件，方便服务器404的时候导航
module.exports = function (fullUrl) {

  let files, content = fullUrl, template;

  try {
    files = fs.readdirSync(fullUrl);
  } catch (e) {
    try {
      content = path.resolve(fullUrl, '../');
      files = fs.readdirSync(content);
    } catch (e) {
      files = [];
    }
  }

  template = "<a href='../'>..</a>";
  for (let i in files) {
    let isDirectory = fs.lstatSync(path.join(content, files[i])).isDirectory();
    template += "<a class='" + (isDirectory ? "folder" : "file") + "' href='./" + files[i] + (isDirectory ? "/" : "") + "'>" + files[i] + "</a>";
  }

  return `<!DOCTYPE html>
<html lang="zh-cn">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>404 Not Found</title>
<link rel="stylesheet" href="/styles/explore404.css">
</head>

<body>

${template}

</body>

</html>`;
};