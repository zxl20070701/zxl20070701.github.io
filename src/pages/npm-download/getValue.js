import xhr from '../../tool/xhr/index';

var date = new Date();
var year = date.getFullYear();
var month_day = "-" + (date.getMonth() - (-1)) + "-" + date.getDate();

export default function (packages) {

    var pkgNames = packages.split(',');

    var promises = []
    for (var pkgName of pkgNames) {
        (function (pkgName) {
            promises.push(new Promise(function (resolve) {

                if (sessionStorage.getItem(pkgName)) {
                    resolve([pkgName, JSON.parse(sessionStorage.getItem(pkgName))])
                } else {

                    xhr({
                        method: "GET",
                        url: "https://api.npmjs.org/downloads/range/" + (year - 1) + month_day + ":" + year + month_day + "/" + pkgName,
                    }, function (data) {
                        if (data.status == 200) {
                            sessionStorage.setItem(pkgName, data.data);
                            var npmOralData = JSON.parse(data.data);
                            resolve([pkgName, npmOralData]);
                        }
                    });
                }

            }));
        })(pkgName);
    }

    return new Promise(function (resolve) {
        Promise.all(promises).then(function (data) {
            var npmOralData = {};
            for (var index = 0; index < data.length; index++) {
                npmOralData[data[index][0]] = data[index][1];
            }
            resolve(npmOralData);
        });
    });
}