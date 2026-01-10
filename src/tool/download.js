export var downloadJSON = function (name, json) {
    var blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = name + ".json";
    link.click();
    URL.revokeObjectURL(url);
};