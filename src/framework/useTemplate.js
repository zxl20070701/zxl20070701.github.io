import isObject from "../tool/type/isObject";
import isFunctin from "../tool/type/isFunction";
import { evalExpress } from "../tool/value/index";

import toNode from "../tool/to-node";
import setAttribute from "../tool/setAttribute";

import isValidKey from "./isValidKey";
import { ref, reactive } from "./remark-data";
import { watcher, proxy } from "./observe-data";

// 公共指令
import uiBind from "../directives/ui-bind";
import uiModel from "../directives/ui-model";
import uiOn from "../directives/ui-on";
import uiDragdrop from "../directives/ui-dragdrop";

export default function useTemplate(el, pagefactory, props) {

    var key;

    var pageinfo = pagefactory({
        ref: ref,
        reactive: reactive
    }, props || {});

    // 创建实例
    var instance = {

        // 记录数据改变需要触发的更新
        _update: [],

    };

    if ('name' in pageinfo) instance._name = pageinfo.name;

    // 如果js中有数据改变需要更新试图，会触发这个方法
    var hadWillUpdate = false;
    var upateView = function () {

        // 节流处理
        // 如果在一次有多个数据改变，保证只会触发一次更新
        if (!hadWillUpdate) {
            hadWillUpdate = true;

            setTimeout(function () {

                // 触发改变前钩子
                if (isFunctin(pageinfo.beforeUpdate)) {
                    pageinfo.beforeUpdate.call(instance);
                }

                // 触发更新
                for (var p = 0; p < instance._update.length; p++) {
                    instance._update[p]();
                }

                // 触发改变后钩子
                if (isFunctin(pageinfo.updated)) {
                    pageinfo.updated.call(instance);
                }

                hadWillUpdate = false;
            }, 0);
        }

    };

    // 在实例上挂载方法
    if ('methods' in pageinfo) {
        for (key in pageinfo.methods) {

            // 对于&和_开头的，我们预留内部使用
            isValidKey(key);

            instance[key] = pageinfo.methods[key];
        }
    }

    // 实例上挂载数据并启动监听
    if ("data" in pageinfo) {
        for (key in pageinfo.data) {
            isValidKey(key);

            // 如果是标记需要双向绑定的
            if (isObject(pageinfo.data[key]) && 'value' in pageinfo.data[key] && 'type' in pageinfo.data[key]) {
                if (pageinfo.data[key].type == 'ref') {
                    watcher(instance, pageinfo.data[key], key, upateView);
                } else if (pageinfo.data[key].type == 'reactive') {
                    proxy(instance, pageinfo.data[key], key, upateView);
                }
            }

            // 否则就静态数据
            else {
                instance[key] = pageinfo.data[key];
            }
        }
    }

    // 登记全局指令
    pageinfo.directives = pageinfo.directives || {};
    pageinfo.directives['ui-bind'] = uiBind;
    pageinfo.directives['ui-model'] = uiModel;
    pageinfo.directives['ui-on'] = uiOn;
    pageinfo.directives['ui-dragdrop'] = uiDragdrop;

    if ("render" in pageinfo) {

        // 触发挂载前钩子
        if (isFunctin(pageinfo.beforeMount)) {
            pageinfo.beforeMount.call(instance);
        }

        // 初始化挂载
        (function doMount(el, childNodes) {
            var k
            for (k = 0; k < childNodes.length; k++) {
                (function () {
                    var currentNode, currentEl, attrKey, attrValue, keyArray, directive, value;

                    currentNode = pageinfo.render[childNodes[k]];

                    // 如果是节点
                    if (currentNode.type == 'tag') {

                        // 兼容svg特殊类型创建节点
                        currentEl = toNode(currentNode.name);

                        for (attrKey in currentNode.attrs) {
                            attrValue = currentNode.attrs[attrKey];
                            keyArray = (attrKey + ":").split(':');

                            // 指令
                            if (keyArray[0] in pageinfo.directives) {
                                directive = pageinfo.directives[keyArray[0]];

                                // 插入钩子直接执行
                                if (isFunctin(directive.inserted)) {

                                    (function (directive, attrValue, keyArray) {

                                        // 为什么延迟？
                                        // 这是为了等待节点挂载完毕
                                        setTimeout(function () {

                                            value = undefined;
                                            try { value = evalExpress(instance, attrValue) } catch (e) { }

                                            directive.inserted(currentEl.value, {
                                                type: keyArray[1],
                                                exp: attrValue,
                                                value: value,
                                                target: instance
                                            });
                                        });
                                    })(directive, attrValue, keyArray);
                                }

                                // 如果是更新钩子
                                // 登记
                                if (isFunctin(directive.update)) {

                                    (function (directive, attrValue, keyArray) {
                                        instance._update.push(function () {
                                            value = undefined;
                                            try { value = evalExpress(instance, attrValue) } catch (e) { }

                                            directive.update(currentEl.value, {
                                                type: keyArray[1],
                                                exp: attrValue,
                                                value: value,
                                                target: instance
                                            });
                                        });
                                    })(directive, attrValue, keyArray);

                                }

                            }

                            // 普通
                            else {
                                setAttribute(currentEl, attrKey, attrValue);
                            }

                        }

                        // 挂载到页面
                        el.appendChild(currentEl.value);

                        // 解析孩子
                        doMount(currentEl.value, currentNode.childNodes);

                    }

                    // 如果是文本
                    else if (currentNode.type == 'text') {
                        currentEl = document.createTextNode("");
                        currentEl.textContent = currentNode.content

                            // 特殊转义字符进行校对
                            .replace(/\&lt;/g, '<')
                            .replace(/\&gt;/g, '>')
                            .replace(/\&amp;/g, '&');

                        el.appendChild(currentEl);
                    }
                })();
            }
        })(el, pageinfo.render[0].childNodes);

        // 触发挂载后钩子
        if (isFunctin(pageinfo.mounted)) {
            setTimeout(function () {
                pageinfo.mounted.call(instance);
            });
        }
    } else {
        throw new Error("Render is required!");
    }

    return instance;

};