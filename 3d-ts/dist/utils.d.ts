import * as THREE from 'three';
/**
 * 检测颜色是否是十六进制数组
 * @param {*} arr
 * @returns
 */
export declare function isArrayWithHexColors(arr: string[] | [string, string][]): boolean;
/**
 *
 * @param cs
 * @param cLen
 * @returns
 */
export declare function getDrawColors(cs: any, cLen: any): any[];
/**
 * 获取暗色向渐变颜色
 * @param {string} color 基础颜色
 * @param {number} step  数量
 * @returns {array} list 颜色数组
 */
export declare function getShadowColor(color: string, step: any): any[];
export declare function getColor(color: any): {
    red: number;
    green: number;
    blue: number;
    result: string;
    alpha: number;
};
export declare function parseResultColor(val: any): {
    red: any;
    green: any;
    blue: any;
    result: string;
};
export declare function get16(value: any): any;
export declare function to16(value: number): string;
/**
 * 检测是否是渐变颜色数组
 * @param {*} arr
 * @returns
 */
export declare function isColorArray(arr: string[] | [string, string][]): boolean;
/**
 * 创建渐变颜色
 * @param {*} colors
 * @param {*} step
 * @returns
 */
export declare function createGradientColors(colors: any, step: any): any[];
/**
 * 获取基本材质
 * @param {*} color
 * @returns
 */
export declare function createBasicMaterial(color: any): THREE.MeshBasicMaterial;
export declare function createLinearGradientMaterial(colors: any): THREE.MeshBasicMaterial;
