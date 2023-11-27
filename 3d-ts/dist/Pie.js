import { ThreeBase } from './ThreeBase';
import * as THREE from 'three';
import { createBasicMaterial, createGradientColors, createLinearGradientMaterial, getDrawColors, isArrayWithHexColors, isColorArray, } from './utils';
// 加载图片纹理
let textureLoader = new THREE.TextureLoader();
export class Pie extends ThreeBase {
    group = null;
    options;
    rotation = new THREE.Euler(0, 0.001, 0);
    constructor(element, options) {
        super({ isAxis: false, isStats: false, isRaycaster: false });
        this.options = options;
        this.initThree(element);
        this.createChat(options);
    }
    createChat(_options) {
        const options = {
            //最大高度
            maxHeight: 10,
            //基础高度
            baseHeight: 10,
            //外半径
            outerRadius: 30,
            //内半径
            innerRadius: 15,
            //开启动画
            isAnimate: false,
            ..._options,
        };
        // 如果有旧的group，先清除
        if (this.group) {
            this.scene?.remove(this.group);
            this.group = null;
        }
        // 如果没有数据，直接返回
        if (options.data.length == 0) {
            return;
        }
        // 颜色组
        let colors = [];
        // 当前颜色类型 simple gradient
        let currentColorType = 'simple';
        // 是否为颜色数组
        if (isArrayWithHexColors(options.colors)) {
            // 获取颜色组
            colors = getDrawColors(options.colors, 10);
            currentColorType = 'simple';
        }
        if (isColorArray(options.colors)) {
            //获取渐变色
            colors = createGradientColors(options.colors, 20);
            currentColorType = 'gradient';
        }
        if (colors.length == 0) {
            throw new Error('颜色配置错误');
        }
        let { baseHeight, maxHeight, outerRadius, innerRadius } = options;
        let sum = 0;
        let min = Number.MAX_SAFE_INTEGER;
        let max = 0;
        // 计算总数，最大值，最小值
        for (let i = 0; i < options.data.length; i++) {
            let item = options.data[i];
            sum += item.value;
            if (min > item.value) {
                min = item.value;
            }
            if (max < item.value) {
                max = item.value;
            }
        }
        // 计算外半径 - 内半径 的差值
        let startRadius = 0;
        let valueDiff = max - min;
        let allHeight = maxHeight - baseHeight;
        let group = new THREE.Group();
        this.group = group;
        this.scene.add(group);
        const spacing = 5;
        // 创建饼图
        for (let index = 0; index < options.data.length; index++) {
            let objGroup = new THREE.Group();
            objGroup.name = 'pie_group_' + index;
            const targetColor = options.colors[index % options.colors.length];
            let item = options.data[index];
            //角度范围
            let angel = (item.value / sum) * Math.PI * 2;
            // 偏移量
            const offset = (spacing / 1e3) * Math.PI * 2;
            //高度与值的映射
            let height = baseHeight + ((item.value - min) / valueDiff) * allHeight;
            const chatOptions = {
                angel,
                offset,
                radiusDiff: outerRadius - innerRadius,
                startRadius,
                axis: new THREE.Vector3(1, 0, 0),
                height,
                outerRadius,
                innerRadius,
            };
            //每个3D组成块组成：扇形柱体加两片矩形面
            if (item.value) {
                const isSimpleColor = currentColorType === 'simple';
                const createMaterial = isSimpleColor
                    ? createBasicMaterial
                    : createLinearGradientMaterial;
                //创建渐变色材质组
                const cs = colors[index % colors.length];
                const getColor = targetIndex => {
                    if (isSimpleColor) {
                        return cs[targetIndex];
                    }
                    else {
                        return [cs[0][targetIndex], cs[1][targetIndex]];
                    }
                };
                // 外圈
                createOutRing(objGroup, createMaterial(getColor(2)), chatOptions);
                // 内圈
                createInnerRing(objGroup, createMaterial(getColor(2)), chatOptions);
                // 上盖
                createUpSide(objGroup, createMaterial(getColor(2)), chatOptions);
                // 下盖
                createDownSide(objGroup, createMaterial(getColor(3)), chatOptions);
                // 前面
                createFontSlide(objGroup, createMaterial(getColor(4)), chatOptions);
                // 后面
                createEndSlide(objGroup, createMaterial(getColor(4)), chatOptions);
                if (options.planeImage) {
                    // 创建平面
                    createPlane(objGroup, {
                        ...chatOptions,
                        width: 90,
                        height: 90,
                        name: index,
                        image: options.planeImage,
                    });
                }
                group.add(objGroup);
            }
            // 每个块的起始点位+角度
            startRadius = angel + startRadius;
        }
    }
    animateAction() {
        if (this.rotation && this.group && !!this.options.isAnimate) {
            // 在每帧更新时旋转Group对象
            this.group.rotation.x += this.rotation.x;
            this.group.rotation.y += this.rotation.y;
            this.group.rotation.z += this.rotation.z;
        }
    }
}
const createOutRing = (group, material, { outerRadius, height, startRadius, offset, angel, name }) => {
    //外圈
    let geometry = new THREE.CylinderGeometry(outerRadius, outerRadius, height, 24, 24, true, startRadius + offset, angel - offset * 2);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = height * 0.5;
    mesh.name = 'pie_out_' + name;
    group.add(mesh);
};
//内圈
const createInnerRing = (group, material, { innerRadius, height, startRadius, offset, angel, name }) => {
    let geometry = new THREE.CylinderGeometry(innerRadius, innerRadius, height, 24, 24, true, startRadius + offset, angel - offset * 2);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = height * 0.5;
    mesh.name = 'pie_inner_' + name;
    group.add(mesh);
};
// 上盖
const createUpSide = (group, material, { innerRadius, outerRadius, startRadius, offset, angel, height, name, }) => {
    let geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32, 1, startRadius + offset, angel - offset * 2);
    //上盖
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'pie_up_' + name;
    mesh.rotateX(-0.5 * Math.PI);
    mesh.rotateZ(-0.5 * Math.PI);
    mesh.position.y = height;
    group.add(mesh);
};
// 下盖
const createDownSide = (group, material, { innerRadius, outerRadius, startRadius, offset, angel, height, name, }) => {
    let geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32, 1, startRadius + offset, angel - offset * 2);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'pie_down_' + name;
    mesh.rotateX(-0.5 * Math.PI);
    mesh.rotateZ(-0.5 * Math.PI);
    mesh.position.y = 0.001;
    group.add(mesh);
};
const createFontSlide = (group, material, { innerRadius, startRadius, height, offset, radiusDiff, name, axis, angel, }) => {
    //侧面1
    const g = new THREE.PlaneGeometry(radiusDiff, height);
    const plane = new THREE.Mesh(g, material);
    plane.position.y = height * 0.5;
    plane.position.x = 0;
    plane.position.z = 0;
    plane.name = 'pie_front_' + name;
    plane.rotation.y = startRadius + offset + Math.PI * 0.5;
    plane.translateOnAxis(axis, -(innerRadius + 0.5 * radiusDiff));
    group.add(plane);
};
const createEndSlide = (group, material, { innerRadius, startRadius, height, offset, radiusDiff, name, axis, angel, }) => {
    const g = new THREE.PlaneGeometry(radiusDiff, height);
    const plane = new THREE.Mesh(g, material);
    plane.position.y = height * 0.5;
    plane.position.x = 0;
    plane.position.z = 0;
    plane.name = 'pie_end_' + name;
    plane.rotation.y = startRadius + angel + Math.PI * 0.5 - offset;
    plane.translateOnAxis(axis, -(innerRadius + 0.5 * radiusDiff));
    group.add(plane);
};
const createPlane = (group, _options) => {
    const options = {
        width: 100,
        height: 100,
        ..._options,
    };
    // 创建平面底座
    textureLoader.load(options.image, function (texture) {
        // 创建图片材质
        let imageMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
        });
        imageMaterial.blending = THREE.NormalBlending;
        // 创建图片几何体
        let imageGeometry = new THREE.PlaneGeometry(options.width, options.height);
        let imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        imageMesh.position.set(0, 0, 0); // 设置图片位置
        imageMesh.rotation.x = -Math.PI / 2; // 设置图片旋转角度
        group.add(imageMesh);
    });
};
