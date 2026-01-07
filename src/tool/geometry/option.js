import { initConfig } from "../config";

export default function (option) {
    return initConfig({
        precision: 0.1, // 精度
        normal: false, // 是否需要法向量
    }, option || {});
};