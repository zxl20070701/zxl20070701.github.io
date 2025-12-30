// 获取平台名称
export var platformName = function () {
    var systeNameEn = localStorage.getItem("systeNameEn");
    if (systeNameEn) return systeNameEn;
    return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent) ? "mobile" : "pc";
};