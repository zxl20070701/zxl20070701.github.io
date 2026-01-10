import template from './index.html';
import './index.scss';

var cacheData = {}, handler;
export default function (obj, props) {
    return {
        name: "modify",
        render: template,
        data: {
            dragdropPadding: [0, 0, 0, 0],
            isEmpty: obj.ref(true),
            name: obj.ref("")
        },
        methods: {
            initData: function (data, _handler) {
                if (data) {
                    cacheData = data;
                    this.setData();
                } else {
                    cacheData = {};
                }
                handler = _handler;
                this.isEmpty = !data;
            },
            setData: function () {
                for (var key in cacheData) {
                    this[key] = cacheData[key];
                }
            },
            doSave: function () {
                handler.save({
                    name: this.name
                });
            },
            doReset: function () {
                this.setData();
            },
            doDelete: function () {
                if (confirm("确定删除【" + this.name + "】吗？")) {
                    handler.delete();
                    this.initData();
                }
            }
        }
    };
};