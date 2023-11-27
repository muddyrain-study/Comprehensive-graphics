import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export class ThreeBase {
    container = null;
    renderer = null;
    scene = null;
    camera = null;
    initCameraPos = [100, 100, 0];
    stats = null;
    isAxis = false;
    isStats = false;
    isRaycaster = false;
    controls = null;
    threeAnimation = null;
    constructor(options) {
        this.isAxis = options.isAxis;
        this.isStats = options.isStats;
        this.isRaycaster = options.isRaycaster;
    }
    // 初始化3d
    initThree(el) {
        window.ThreeBase = this;
        this.container = el;
        // 启用缓存
        THREE.Cache.enabled = true;
        // 初始化渲染器
        this.renderer = new THREE.WebGLRenderer({
            // 开启抗锯齿
            antialias: true,
            // 开启透明度
            alpha: true,
            // 开启深度解析
            logarithmicDepthBuffer: true,
        });
        // 设置渲染器颜色
        this.renderer.setClearColor(0x000000, 0);
        // 设置渲染器大小
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // 添加到dom
        this.container.appendChild(this.renderer.domElement);
        // 初始化场景
        this.scene = new THREE.Scene();
        // 初始化相机
        this.camera = new THREE.PerspectiveCamera(40, this.container.offsetWidth / this.container.offsetHeight, 1, 100000);
        this.camera.position.set(...this.initCameraPos);
        if (this.isAxis) {
            const axesHelper = new THREE.AxesHelper(500);
            this.scene.add(axesHelper);
        }
        if (this.isStats) {
            this.stats = new Stats();
            this.stats.dom.style.position = 'absolute';
            this.stats.dom.style.top = '0px';
            this.container.appendChild(this.stats.dom);
        }
        if (this.isRaycaster) {
            this.initRaycaster();
        }
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        const animate = () => {
            this.threeAnimation = requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
            if (this.isStats) {
                this.stats.update();
            }
            this.animateAction();
        };
        animate();
    }
    // 初始化射线
    initRaycaster() { }
    // 执行动画动作
    animateAction() { }
    // 清除所有
    cleanAll() {
        cancelAnimationFrame(this.threeAnimation);
        this.controls && this.controls.dispose();
    }
    onResize() {
        if (this.container) {
            this.camera.aspect =
                this.container.offsetWidth / this.container.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        }
    }
}
