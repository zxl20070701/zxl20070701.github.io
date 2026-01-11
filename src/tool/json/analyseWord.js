import ReadString from '../ReadString';

export default function (express) {

    // 剔除开头和结尾的空白
    express = express.trim();

    // 获取字符串分析对象
    var reader = ReadString(express);

    var wordArray = [];
    var tempWord = "";
    reader.readNext();

    // 定义一个追加普通串的方法
    var pushNormal = function () {
        tempWord = tempWord.trim();
        if (tempWord != '') {
            wordArray.push({
                type: "normal",
                value: tempWord
            });
        }
        tempWord = "";
    };

    while (true) {

        if (reader.index >= express.length) break;

        // 单行注释
        if (reader.getNextN(2) == '//') {
            while (!/\n/.test(reader.readNext()) && reader.index < express.length);
        }

        // 多行注释
        else if (reader.getNextN(2) == '/*') {
            while (reader.getNextN(2) != '*/') {
                if (reader.index >= express.length) {
                    throw new Error("Multiline comment not closed correctly : " + express + "\nstep='analyseWord-searchEndComment'");
                }
                reader.readNext();
            }
            reader.readNext();
            reader.readNext();
        }

        // 如果是边界符号
        else if (['{', '}', ',', '[', ']', ':'].indexOf(reader.currentChar) > -1) {
            pushNormal();

            wordArray.push({
                type: "insign",
                value: reader.currentChar
            });
            reader.readNext();
        }

        // 如果遇到字符串，应该是一个独立的单词
        else if (['"', "'"].indexOf(reader.currentChar) > -1) {

            var tempStrWord = "";
            while (['"', "'"].indexOf(reader.readNext()) < 0) {
                if (reader.index >= express.length) {
                    throw new Error("The string is not closed correctly : " + express + "\nstep='analyseWord-searchString',currentStrWord=" + tempStrWord);
                }
                tempStrWord += reader.currentChar;
            }
            reader.readNext();
            wordArray.push({
                type: "string",
                value: tempStrWord
            });

        } else {
            tempWord += reader.currentChar;
            reader.readNext();
        }

    }

    return wordArray;
};
