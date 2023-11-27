import { ThreeBase } from './ThreeBase';
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
}
export declare class Pie extends ThreeBase {
    private group;
    constructor(element: HTMLElement, options: ChatOptions);
    private createChat;
}
