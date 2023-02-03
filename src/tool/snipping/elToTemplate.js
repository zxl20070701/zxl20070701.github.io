import getStyle from '../xhtml/getStyle';

export default function elToTemplate(el) {
    var tagName = el.tagName.toLowerCase();

    var styleTemplate = "";
    var elStyles = getStyle(el);

    for (var index = 0; index < elStyles.length; index++) {
        var keyName = elStyles[index];
        styleTemplate += keyName + ":" + elStyles[keyName] + ";";
    }

    var template = "<" + tagName + " style='" + styleTemplate + "'>";

    for (var index = 0; index < el.childNodes.length; index++) {

        if (el.childNodes[index].nodeType == '3') {
            template += el.childNodes[index].textContent;
        } else if (el.childNodes[index].nodeType == '1') {
            template += elToTemplate(el.childNodes[index]);
        }

    }

    template += "</" + tagName + ">";

    return template;
};