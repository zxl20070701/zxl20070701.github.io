export default function (input) {
    if (input !== undefined) {

        input = +input;

        // 特殊情况提前判断
        if (input === 0) {
            return '零';
        }

        var strOutput = '';
        var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';

        // 把个位数统一为分
        input += '00';
        var intPos = input.indexOf('.');
        if (intPos >= 0) {
            input = input.substring(0, intPos) + input.substring(intPos + 1, intPos + 3);
        }

        // 类似把123变成壹元贰角叁分
        strUnit = strUnit.substring(strUnit.length - input.length)
        for (var i = 0; i < input.length; i++) {
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substring(input.substring(i, i + 1), input.substring(i, i + 1) - -1) + strUnit.substring(i, i + 1);
        }

        // 返回前对一些不合适的情况进行兼容
        return strOutput.replace(/^零角零分$/, '').replace(/零角零分$/, '整').replace(/^零元零角/, '').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, '零元').replace(/零角/, '零').replace(/零元/, '').replace(/零分$/, '');
    }
    return input;
};