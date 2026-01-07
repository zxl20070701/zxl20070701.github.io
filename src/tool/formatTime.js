// 把秒值变成更可读的格式
export default function(time) {
    return (Math.floor(time / 60)) + ":" + (Math.floor(time % 60)) + "." + ((time % 1).toFixed(3) + "").replace(/^.{0,}\./, '')
};