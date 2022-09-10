// 标记所有没有闭合结点的直接自闭合
let closeTag = function (tagArray) {

    let needClose = [];

    tagArray.forEach(function (tag, i) {
        if (tag.type == 'beginTag') {

            needClose.push([i, tag.tagName]);

        } else if (tag.type == 'endTag') {

            while (needClose.length > 0) {

                let needCloseTag = needClose.pop();

                if (needCloseTag[1] == tag.tagName) {
                    break;
                } else {
                    tagArray[needCloseTag[0]].type = 'fullTag';
                }

            }

        }
    });

    return tagArray;
};

// 分析deep
// 我们会在这里校对那些没有结束标签的开始标签
// 这步结束以后，每个都是一个单独的标签
// 也就是不用再区分开始或闭合了
let analyseDeep = function (tagArray) {

    // 闭合标签
    tagArray = closeTag(tagArray);

    let deep = 0, tagDeepArray = [];

    tagArray.forEach(function (tag) {

        if (tag.type == 'beginTag') {

            tagDeepArray.push({
                type: "tag",
                name: tag.tagName,
                attrs: tag.attrs,
                __deep__: ++deep,
                __tagType__: "double"
            });

        } else if (tag.type == 'endTag') {

            deep -= 1;


        } else if (tag.type == 'textcode') {

            // 如果是文本
            tagDeepArray.push({
                type: "text",
                content: tag.tagName,
                __deep__: deep + 1
            });

        } else if (tag.type == 'comment') {

            // 如果是注释
            tagDeepArray.push({
                type: "comment",
                content: tag.tagName,
                __deep__: deep + 1
            });

        } else {

            // 如果是自闭合结点
            tagDeepArray.push({
                type: "tag",
                name: tag.tagName,
                attrs: tag.attrs,
                __deep__: deep + 1,
                __tagType__: "single"
            });

        }

    });

    return tagDeepArray;

};

// 分析结点的属性
let analyseTag = function (attrString) {
    let attr = {}, index = 0;

    attrString = attrString.trim();

    let getOneAttr = function () {

        // 属性名和属性值
        let attrName = "", attrValue = "";

        // 先寻找属性名
        for (; index < attrString.length; index++) {

            // 寻找属性名的时候遇到空白或结尾的时候，肯定没有属性值
            if (/^[\x20\t\r\n\f]{0,}$/.test(attrString[index]) || index == attrString.length - 1) {

                attrName += attrString[index];

                // 如果属性名是空白，就不需要记录了
                if (!/^[\x20\t\r\n\f]{0,}$/.test(attrName)) {
                    attr[attrName.trim()] = "";
                }
                index += 1;
                break;

            }

            // 如果遇到等号，说明属性名寻找结束了
            else if (attrString[index] == '=') {

                // 接着寻找属性值
                index += 1;

                // 由于属性可能由引号包裹或直接暴露
                let preCode = null, preLeng = -1;

                // 如果是由'或者"包裹
                if (attrString.substr(index, 1) == '"' || attrString.substr(index, 1) == "'") {
                    preCode = attrString.substr(index, 1);
                    preLeng = 1;
                    index += 1;
                }

                // 如果是由\'或\"包裹
                else if (attrString.substr(index, 2) == '\"' || attrString.substr(index, 2) == "\'") {
                    preCode = attrString.substr(index, 2);
                    preLeng = 2;
                    index += 2;
                }

                // 开始正式寻找属性值

                // 如果没有包裹，是直接暴露在外面的
                // 我们寻找到空格或结尾即可
                if (preCode !== null) {

                    for (; index < attrString.length; index++) {
                        if (attrString.substr(index, preLeng) == preCode) {
                            attr[attrName.trim()] = attrValue.trim();
                            index += 2;
                            break;
                        } else {
                            attrValue += attrString[index];
                        }
                    }

                }

                // 如果是包裹的
                // 我们确定寻找到对应的包裹闭合即可
                else {
                    for (; index < attrString.length; index++) {
                        if (/^[\x20\t\r\n\f]{0,}$/.test(attrString[index])) {
                            attr[attrName.trim()] = attrValue.trim();
                            index += 1;
                            break;
                        } else {
                            attrValue += attrString[index];
                        }
                    }
                }

                break;

            } else {
                attrName += attrString[index];
            }
        }

        // 如果还有字符串，继续解析
        if (index < attrString.length) {
            getOneAttr();
        }

    };

    getOneAttr();

    return attr;
};

let nextTagFun = function (template) {

    let i = -1,

        // 当前面对的字符
        currentChar = null;

    // 如果前面是获取的js或css，还有pre等开始标签，比较特殊，直接寻址闭合的
    let preIsSpecial = false, specialCode = "";
    let specialTag = ['script', 'pre', 'style', 'code'];

    // 获取下一个字符
    let next = function () {
        currentChar = i++ < template.length - 1 ? template[i] : null;
        return currentChar;
    };

    // 获取往后n个值
    let nextNValue = function (n) {
        return template.substring(i, n + i > template.length ? template.length : n + i);
    };

    next();
    // 剔除开头的空白
    while (new RegExp("[\\x20\\t\\r\\n\\f]").test(currentChar) && i < template.length - 1) next();


    /**
     * 一个Tag存在哪些类型？如下：
     * 1.<tag-name>       { tagName:'tag-name', type:'beginTag', attrs:{} }      开始标签
     * 2.</tag-name>      { tagName:'tag-name', type:'endTag'   }                结束标签
     * 3.<tag-name />     { tagName:'tag-name', type:'fullTag',  attrs:{} }      自闭合标签
     * 4.text             { tagName:'text',     type:'textcode' }                文本结点
     * 5.<!-- text -->    { tagName:'text',     type:'comment'  }                注释
     * 6.<!DOCTYPE text>  { tagName:'text',     type:'DOCTYPE'  }                声明
     *
     *
     */
    return function () {

        let tag = currentChar, tagObj = {};

        if (tag == null) return null;

        /**
         * 特殊标签内容获取
         * ========================================
         */

        // 如果是获取特殊标签里面的内容
        // 先不考虑里面包含'</XXX>'
        if (preIsSpecial) {
            tagObj.type = 'textcode';
            tagObj.tagName = tag;
            while (nextNValue(specialCode.length + 3) != '</' + specialCode + '>' && i < template.length) {
                tagObj.tagName += next();
            }
            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            preIsSpecial = false;
            return tagObj;
        }

        /**
         * 特殊标签获取
         * ========================================
         */
        // 针对特殊的comment
        if (nextNValue(4) == '<!--') {
            tagObj.type = 'comment';
            tagObj.tagName = tag;
            while (nextNValue(3) != '-->' && i < template.length) {
                tagObj.tagName += next();
            }
            next(); next(); next();
            tagObj.tagName = tagObj.tagName.replace(/^<!--/, '').replace(/-$/, '');
            return tagObj;
        }

        // 针对特殊的doctype
        if (nextNValue(9) == '<!DOCTYPE') {
            tagObj.type = 'DOCTYPE';
            tagObj.tagName = tag;
            while (nextNValue(1) != '>' && i < template.length) {
                tagObj.tagName += next();
            }
            next();
            tagObj.tagName = tagObj.tagName.replace(/^<!DOCTYPE/, '').replace(/>$/, '');
            return tagObj;
        }

        /**
         * 普通的
         * ========================================
         */

        // 如果是期望归结非文本结点
        else if (tag == '<') {

            // 标记是否处于属性值是字符串包裹中
            let isAttrString = false, attrLeftValue = null, attrLeftLen = null;

            // 如果在包裹中或者没有遇到‘>’说明没有结束
            while ((isAttrString || currentChar != '>') && i < template.length) {

                tag += next();

                // 如果是包裹里面，试探是否即将遇到了结束
                if (isAttrString) {

                    let next23Value = nextNValue(attrLeftLen + 1).substring(1);
                    if (next23Value == attrLeftValue) {
                        isAttrString = false;
                    }

                }

                // 如果在包裹外面，试探是否即将进入包裹
                else {

                    let next23Value = nextNValue(2);
                    if (next23Value == '="' || next23Value == "='") {
                        attrLeftValue = next23Value.replace('=', '');
                        attrLeftLen = 1;
                        isAttrString = true;
                    }

                    next23Value = nextNValue(3);
                    if (next23Value == '=\"' || next23Value == "=\'") {
                        attrLeftValue = next23Value.replace('=', '');
                        attrLeftLen = 2;
                        isAttrString = true;
                    }

                }


            }

            // 针对特殊的结束标签
            if (/^<\//.test(tag)) {
                tagObj.tagName = tag.replace(/^<\//, '').replace(/>$/, '');
                tagObj.type = 'endTag';
            } else {

                if (/\/>$/.test(tag)) {
                    tagObj.type = 'fullTag';
                    tag = tag.replace(/\/>$/, '');
                } else {
                    tagObj.type = 'beginTag';
                    tag = tag.replace(/>$/, '');
                }

                tag = tag.replace(/^</, '');

                tagObj.tagName = "";
                let j = 0;
                for (; j < tag.length; j++) {
                    if (tag[j] == ' ') break;
                    tagObj.tagName += tag[j];
                }

                let attrString = tag.substring(j);
                if (/^[\x20\t\r\n\f]{0,}$/.test(attrString)) {
                    tagObj.attrs = {};
                } else {
                    tagObj.attrs = analyseTag(attrString);
                }

            }

        }

        // 如果是归结文本结点
        // 如果文本中包含<的先忽略考虑
        else {
            tagObj.type = 'textcode';
            tagObj.tagName = currentChar;
            while (nextNValue(1) != '<' && i < template.length) {
                tagObj.tagName += next();
            }
            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            i -= 1;
        }


        // 如果遇到开始script或者style、pre等特殊标签，标记开始获取特殊文本
        if (tagObj.type == 'beginTag') {
            if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
                preIsSpecial = true;
                specialCode = tagObj.tagName;
            }

        }

        // 如果遇到结束script或者style、pre等特殊标签，标记结束获取特殊文本
        else if (tagObj.type == 'endTag') {
            if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
                preIsSpecial = false;
            }
        }

        next();

        return tagObj;

    };

};


module.exports = function (source) {
    // 获取读取下一个标签对象
    let nextTag = nextTagFun(source.trim());

    let tag = nextTag(), DomTree = [];
    while (tag != null) {

        if (tag.type == 'textcode' && /^[\x20\t\r\n\f]{0,}$/.test(tag.tagName)) {

            // 空白文本结点过滤掉

        } else if (tag.type == 'DOCTYPE') {

            // DOCTYPE过滤掉

        } else if (tag.type == 'comment') {

            // 注释过滤掉

        } else {
            tag.tagName = tag.tagName.trim();
            DomTree.push(tag);
        }

        tag = nextTag();
    }

    // 分析层次
    DomTree = analyseDeep(DomTree);

    /**
     * 模仿浏览器构建的一棵树,每个结点有如下属性：
     *
     * 1.parentNode index  父结点
     * 2.childNodes []     孩子结点
     * 3.preNode    index  前一个兄弟结点
     * 4.nextNode   index  后一个兄弟结点
     *
     * 5.attrs:{}          当前结点的属性
     * 6.name              节点名称
     * 7.type              节点类型（tag和text）
     * 8.content           文本结点内容
     *
     * 需要注意的是：如果一个文本结点内容只包含回车，tab，空格等空白字符，会直接被忽视
     */

    let presNode = [null], preDeep = 0;
    for (let i = 0; i < DomTree.length; i++) {

        // 当前结点
        let currentIndex = i, currentDeep = DomTree[i].__deep__;
        DomTree[i].childNodes = [];
        DomTree[i].preNode = null;
        DomTree[i].nextNode = null;

        // 前置三个结点
        let lastPre = presNode[presNode.length - 1];
        let last2Pre = presNode.length > 1 ? presNode[presNode.length - 2] : null;


        // 如果遇到的是兄弟结点
        if (currentDeep == preDeep) {

            // 修改兄弟关系
            DomTree[currentIndex].preNode = lastPre;
            DomTree[lastPre].nextNode = currentIndex;

            // 修改父子关系
            DomTree[currentIndex].parentNode = last2Pre;
            DomTree[last2Pre].childNodes.push(currentIndex);

            // 校对presNode
            presNode[presNode.length - 1] = currentIndex;
        }

        // 如果是遇到了孩子
        else if (currentDeep > preDeep) {

            // 修改兄弟关系
            // todo

            // 修改父子关系
            DomTree[currentIndex].parentNode = lastPre;
            if (lastPre != null) DomTree[lastPre].childNodes.push(currentIndex);

            // 校对presNode
            presNode.push(currentIndex);
        }

        // 如果是遇到了祖先
        else {

            let preTempIndex = presNode[presNode.length - 1 - (preDeep - currentDeep)];
            let preTemp2Index = presNode[presNode.length - 2 - (preDeep - currentDeep)];

            // 修改兄弟关系
            DomTree[currentIndex].preNode = preTempIndex;
            if (preTempIndex != null) DomTree[preTempIndex].nextNode = currentIndex;

            // 修改父子关系
            DomTree[currentIndex].parentNode = preTemp2Index;
            if (preTemp2Index != null) DomTree[preTemp2Index].childNodes.push(currentIndex);

            // 校对presNode
            for (let j = 0; j < preDeep - currentDeep; j++) { presNode.pop(); }
            presNode[presNode.length - 1] = currentIndex;

        }

        preDeep = currentDeep;

    }

    return DomTree;

};