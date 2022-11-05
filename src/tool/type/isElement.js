export default function (dom) {
    return dom !== null && typeof dom === 'object' &&
        [1, 9, 11].indexOf(dom.nodeType) > -1
};