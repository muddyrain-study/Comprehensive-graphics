import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
declare global {
    interface Window {
        ThreeBase: ThreeBase;
    }
}
export declare class ThreeBase {
    container: HTMLElement | null;
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    initCameraPos: number[];
    stats: Stats | null;
    private isAxis;
    private isStats;
    private isRaycaster;
    controls: OrbitControls | null;
    threeAnimation: number | null;
    constructor(options: {
        isAxis: boolean;
        isStats: boolean;
        isRaycaster: boolean;
    });
    initThree(el: HTMLElement): void;
    initRaycaster(): void;
    animateAction(): void;
    cleanAll(): void;
    onResize(): void;
}
