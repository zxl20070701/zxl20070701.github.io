module.exports = function (statement) {

    // 去掉开头的export
    statement = statement.replace(/^export +/, '');

    // export default => __pkg__scope_bundle__.default=
    if (/^default/.test(statement)) {
        statement = "__pkg__scope_bundle__.default" + (statement.replace(/^default/, '='));
    }

    // export function XXX() => __pkg__scope_bundle__.XXX=function()
    else if (/^function/.test(statement)) {
        statement = "__pkg__scope_bundle__." + (statement.replace(/^function +([^ (]+)\(/, '$1=function('));
    }

    // export (var|const|let) XXX => __pkg__scope_bundle__.XXX=
    else if (/^(var|const|let)/.test(statement)) {
        statement = "__pkg__scope_bundle__." + (statement.replace(/^(var|const|let) +/, ''));
    }

    // 其它
    else {
        // todo
    }

    return statement;
};