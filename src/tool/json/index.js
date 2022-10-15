import isString from '../type/isString';
import analyseWord from './analyseWord';
import toValue from './toValue';

// 把一段字符串变成json返回
export default function (express) {

    if (isString(express)) {

        // 先分析出来单词
        var wordArray = analyseWord(express);

        /**
         * 思路：
         * 从后往前找，找到第一个需要归结的，直接归结，
         * 归结完毕以后，继续，知道找到开头，说明归结完毕，
         * 这样设计的好处是：
         * 从后往前找，一定是叶子，这就消除了递归。
         */
        var i = wordArray.length - 1, j;

        // 只要单词数组归结完毕
        while (wordArray.length > 1) {

            // 从后往前找第一个需要归结的子对象
            while (i >= 0 && (wordArray[i].type != 'insign' || ['{', '['].indexOf(wordArray[i].value) < 0)) {
                i = i - 1;
            }

            if (i < 0) {
                // 如果到开头都没有遇到，缺少开始符号
                throw new Error("Illegal express : " + express + "\nstep='toOne-searchBeginIndex',wordArray=" + wordArray);
            }

            // 然后合并
            j = i + 1;
            var subWordArray = [wordArray[i]];
            while (j < wordArray.length && (wordArray[j].type != 'insign' || wordArray[j].value != {
                "{": "}",
                "[": "]"
            }[wordArray[i].value])) {
                subWordArray.push(wordArray[j]);
                j = j + 1;
            }

            if (j >= wordArray.length) {
                // 如果到结尾都没有需要应该闭合的符号，缺少闭合符号
                throw new Error("Illegal express : " + express + "\nstep='toOne-searchEndIndex',wordArray=" + wordArray);
            } else {

                // 结尾追加进去
                subWordArray.push(wordArray[j]);

                // 归结
                wordArray[i] = toValue(subWordArray);

                // 调整
                wordArray.splice(i + 1, j - i);
            }


        }

        // 返回计算结果
        return wordArray[0].value;

    } else {

        throw new Error('The data passed is not a string.');

    }

};
