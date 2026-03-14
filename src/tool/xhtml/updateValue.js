export default function (el, value) {
    var type = el.getAttribute('type');

    // 单选
    if (type == 'radio') {
        if (value == el.value) {
            el.setAttribute("checked", "checked");
        } else {
            el.removeAttribute("checked");
        }
    }

    // 多选
    else if (type == 'checkbox') {
        if (el.checked || (typeof value === "boolean" && value) || (typeof value === "Array" && value.indexOf(el.getAttribute("value")))) {
            el.setAttribute("checked", "checked");
        } else {
            el.removeAttribute("checked");
        }
    }

    // 普通的
    else {
        if (el.value !== value || el.textContent !== value) {
            el.value = el.textContent = value;
        }
    }

};