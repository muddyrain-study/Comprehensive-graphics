import { ThreeBase } from "./ThreeBase";
import * as THREE from "three";
export interface ChatOptions {
    /**
     * 颜色 单色：['#fff']  渐变：[['#fff','#000']]
     */
    colors: string[] | [string, string][];
    /**
     * 数据格式
     */
    data: {
        name: string;
        value: number;
    }[];
    /**
     * 最大高度
     */
    maxHeight?: number;
    /**
     * 基础高度
     */
    baseHeight?: number;
    /**
     * 外半径
     */
    outerRadius?: number;
    /**
     * 内半径
     */
    innerRadius?: number;
    /**
     * 开启动画
     */
    isAnimate?: boolean;
    /**
     * 平面图片
     */
    planeImage?: string;
    /**
     * 是否支持轨道控制器
     */
    isOrbitControls?: boolean;
    /**
     * 是否禁止上下旋转
     */
    isDisabledUpRotate?: boolean;
}
export declare class Pie extends ThreeBase {
    private group;
    options: ChatOptions;
    rotation: THREE.Euler;
    constructor(element: HTMLElement, options: ChatOptions);
    private createChat;
    animateAction(): void;
}
