let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let data = [{
    name: "1968/9/3",
    value: Math.round(Math.random() * 100)
}];
for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay));
    data.push({
        name: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        value: Math.round((Math.random() - 0.5) * 20 + data[i - 1].value)
    });
}

export default data;