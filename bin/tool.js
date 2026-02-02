const { networkInterfaces, platform } = require("os");
const { exec } = require('child_process');

exports.simpleUrl = function (filepath) {
    return filepath.replace(process.cwd(), './').replace(/\\/g, '/').replace(/\/\//g, '/');
};

// 网络信息
exports.network = function () {

    let infomation = {
        IPv4: [],
        IPv6: []
    };

    let networks = networkInterfaces();

    let IPv4Had = {}, IPv6Had = {};

    for (let typeName in networks) {
        let network = networks[typeName]
        for (let index = 0; index < network.length; index++) {
            if (network[index].mac != "00:00:00:00:00:00") {
                if (network[index].family == 'IPv4') {
                    if (!IPv4Had[network[index].mac]) {
                        infomation.IPv4.push({
                            address: network[index].address,
                            mac: network[index].mac
                        });

                        IPv4Had[network[index].mac] = true;
                    }
                } else if (network[index].family == 'IPv6') {
                    if (!IPv6Had[network[index].mac]) {
                        infomation.IPv6.push({
                            address: network[index].address,
                            mac: network[index].mac
                        });

                        IPv6Had[network[index].mac] = true;
                    }
                }
            }
        }
    }

    return infomation;
};

exports.openBrowser = function (url) {
    const platformValue = platform();
    let command;

    switch (platformValue) {
        case 'win32': // Windows
            command = `start ${url}`;
            break;
        case 'darwin': // macOS
            command = `open ${url}`;
            break;
        default: // Linux及其他
            command = `xdg-open ${url}`;
    }

    exec(command, (error) => {
        if (error) {
            console.error(`无法打开浏览器: ${error}`);
        } else {
            // todo
        }
    });
}