export default function (count, sphereRadius) {
    const points = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2; // 黄金比例 ≈ 1.618

    for (let i = 0; i < count; i++) {
        // phi: 极角（从-z轴方向测量），通过余弦分布避免极点聚集
        const phi = Math.acos(-1 + (2 * i + 1) / count);
        // theta: 方位角，使用黄金比例确保均匀分布
        const theta = 2 * Math.PI * i / goldenRatio;

        // 将球坐标转换为笛卡尔坐标（x, y, z）
        const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
        const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
        const z = sphereRadius * Math.cos(phi);

        // 计算卡片朝向角度，使卡片始终面向球心
        const rotationY = Math.atan2(x, z) * 180 / Math.PI;
        const rotationX = -Math.asin(y / sphereRadius) * 180 / Math.PI;

        points.push({
            x: x,
            y: y,
            z: z,
            rotationX: rotationX,
            rotationY: rotationY,
            index: i
        });
    }
    return points;
}