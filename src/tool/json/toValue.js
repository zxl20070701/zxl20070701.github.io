var toValue = function (word) {

    if (word.type != 'string' && word.type != 'object') {

        // 数字
        if (/[+-]{0,1}\d{1,}\.{0,1}\d{0,}/.test(word.value)) {
            return +word.value;
        }

        // undefined
        else if (word.value == 'undefined') {
            return undefined;
        }

        // null
        else if (word.value == 'null') {
            return null;
        }

        // false
        else if (word.value == 'false') {
            return false;
        }

        // true
        else if (word.value == 'true') {
            return true;
        }

    }

    return word.value;
}

export default function (wordArray) {

    var value, i;

    // 是json
    if (wordArray[0].value == '{') {
        value = {};
        for (i = 3; i < wordArray.length; i += 4) {
            value[wordArray[i - 2].value] = toValue(wordArray[i]);
        }
    }

    // 数组
    else {
        value = [];
        for (i = 2; i < wordArray.length; i += 2) {
            value.push(toValue(wordArray[i - 1]));
        }
    }

    return {
        type: "object",
        value: value
    };
};
