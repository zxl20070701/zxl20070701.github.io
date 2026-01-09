// 键盘总控

import { getKeyString } from '../keyCode';
import bind from '../xhtml/bind';

export default function () {
    var _this = this;

    if ('__keyLog' in this) {
        console.error('Keyboard has been initialized');
        return;
    } else {

        this.__keyLog = {
            'shift': false
        };

        bind(document.body, 'keydown', function (event) {
            var keyString = getKeyString(event);

            // 标记shift按下
            if (keyString == 'shift') _this.__keyLog.shift = true;
        });

        bind(document.body, 'keyup', function (event) {
            var keyString = getKeyString(event);

            // 标记shift放开
            if (keyString == 'shift') _this.__keyLog.shift = false;
        });

    }

};
