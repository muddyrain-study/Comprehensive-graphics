import * as THREE from 'three';
/**
 * 检测颜色是否是十六进制数组
 * @param {*} arr
 * @returns
 */
export function isArrayWithHexColors(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        const color = arr[i];
        if (typeof color !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(color)) {
            return false;
        }
    }
    return true;
}
/**
 *
 * @param cs
 * @param cLen
 * @returns
 */
export function getDrawColors(cs, cLen) {
    let list = [];
    for (let i = 0; i < cs.length; i++) {
        list.push(getShadowColor(cs[i], cLen));
    }
    return list;
}
/**
 * 获取暗色向渐变颜色
 * @param {string} color 基础颜色
 * @param {number} step  数量
 * @returns {array} list 颜色数组
 */
export function getShadowColor(color, step) {
    let c = getColor(color);
    let { red, blue, green } = c;
    const s = 0.8;
    const r = parseInt((red * s).toString()), g = parseInt((green * s).toString()), b = parseInt((blue * s).toString());
    const rr = (r - red) / step, gg = (g - green) / step, bb = (b - blue) / step;
    let list = [];
    for (let i = 0; i < step; i++) {
        list.push(`rgb(${parseInt((red + i * rr).toString())},${parseInt((green + i * gg).toString())},${parseInt((blue + i * bb).toString())})`);
    }
    return list;
}
//解析颜色
export function getColor(color) {
    let red = 255, green = 255, blue = 255, result = '#FFFFFF', alpha = 100;
    if (color && typeof color == 'string') {
        if (color.indexOf('rgba(') == 0 && color.match(/(,)/g).length == 3) {
            let value = color.slice(5, color.length - 1).split(',');
            red = parseInt(trimString(value[0]));
            green = parseInt(trimString(value[1]));
            blue = parseInt(trimString(value[2]));
            alpha = parseFloat(trimString(value[3])) * 100;
            result = '#' + to16(red) + to16(green) + to16(blue);
        }
        else if (color.indexOf('rgb(') == 0 && color.match(/(,)/g).length == 2) {
            let value = color.slice(4, color.length - 1).split(',');
            red = parseInt(trimString(value[0]));
            green = parseInt(trimString(value[1]));
            blue = parseInt(trimString(value[2]));
            result = '#' + to16(red) + to16(green) + to16(blue);
        }
        else if (color.indexOf('(') >= 0 && color.indexOf(')') >= 0) {
            let v = color.substring(color.indexOf('(') + 1, color.indexOf(')'));
            let a = v.split(',');
            if (a.length == 3) {
                red = parseInt(trimString(a[0]));
                green = parseInt(trimString(a[1]));
                blue = parseInt(trimString(a[2]));
                result = '#' + to16(red) + to16(green) + to16(blue);
            }
            else if (a.length == 4) {
                red = parseInt(trimString(a[0]));
                green = parseInt(trimString(a[1]));
                blue = parseInt(trimString(a[2]));
                alpha = parseFloat(trimString(a[3])) * 100;
                result = '#' + to16(red) + to16(green) + to16(blue);
            }
        }
        else if (color.indexOf('#') == 0) {
            let r = parseResultColor(color);
            red = r.red;
            green = r.green;
            blue = r.blue;
            result = r.result;
        }
    }
    return {
        red,
        green,
        blue,
        result,
        alpha: alpha >= 0 && alpha <= 100 ? alpha : 100,
    };
}
//解析#XXXXXX颜色
export function parseResultColor(val) {
    let color = val.toUpperCase();
    let value = '';
    if (color.length == 7) {
        value = color.slice(1);
    }
    else if (color.length == 4) {
        value =
            color.slice(1, 2) +
                color.slice(1, 2) +
                color.slice(2, 3) +
                color.slice(2, 3) +
                color.slice(3) +
                color.slice(3);
    }
    else if (color.length == 3) {
        value =
            color.slice(1, 2) +
                color.slice(1, 2) +
                color.slice(1, 2) +
                color.slice(2, 3) +
                color.slice(2, 3) +
                color.slice(2, 3);
    }
    if (value.length == 6) {
        let red = get16(value.slice(0, 2));
        let green = get16(value.slice(2, 4));
        let blue = get16(value.slice(4, 6));
        return { red, green, blue, result: '#' + value };
    }
    else {
        return { red: 255, green: 255, blue: 255, result: '#FFFFFF' };
    }
}
/**
 * 清空字符串空白
 * @param {*} str
 * @returns
 */
function trimString(str) {
    if (str) {
        return str.replace(/\s/g, '');
    }
    return str;
}
//转化为10进制
export function get16(value) {
    if (value.match(/[0-9ABCDEF]{2}/g)) {
        let letter = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
        ];
        let shi = value[0];
        let ge = value[1];
        shi = 16 * letter.findIndex(el => el == shi);
        ge = letter.findIndex(el => el == ge);
        return shi + ge;
    }
    else {
        return 0;
    }
}
//转化为16位进制
export function to16(value) {
    if (value >= 0 && value <= 255) {
        let letter = ['A', 'B', 'C', 'D', 'E', 'F'];
        if (value <= 9) {
            return '0' + value;
        }
        else if (value > 9 && value < 16) {
            return '0' + letter[value - 10];
        }
        else if (value >= 16) {
            let shi = parseInt((value / 16).toString());
            let ge = value % 16;
            if (shi > 9 && shi < 16) {
                shi = letter[shi - 10];
            }
            if (ge <= 9) {
                return shi + '' + ge;
            }
            else if (ge > 9 && ge < 16) {
                return shi + '' + letter[ge - 10];
            }
        }
    }
    else {
        return '00';
    }
}
/**
 * 检测是否是渐变颜色数组
 * @param {*} arr
 * @returns
 */
export function isColorArray(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    for (let i = 0; i < arr.length; i++) {
        const color = arr[i];
        if (!Array.isArray(color) || color.length !== 2) {
            return false;
        }
        const color1 = color[0];
        const color2 = color[1];
        if (typeof color1 !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(color1)) {
            return false;
        }
        if (typeof color2 !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(color2)) {
            return false;
        }
    }
    return true;
}
/**
 * 创建渐变颜色
 * @param {*} colors
 * @param {*} step
 * @returns
 */
export function createGradientColors(colors, step) {
    const darkenedColors = [];
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const darkenedColor1 = [];
        const darkenedColor2 = [];
        for (let j = 0; j < 5; j++) {
            const r = parseInt(color[0].slice(1, 3), 16) - j * step;
            const g = parseInt(color[0].slice(3, 5), 16) - j * step;
            const b = parseInt(color[0].slice(5, 7), 16) - j * step;
            darkenedColor1.push(`rgb(${r},${g},${b})`);
        }
        for (let j = 0; j < 5; j++) {
            const r = parseInt(color[1].slice(1, 3), 16) - j * step;
            const g = parseInt(color[1].slice(3, 5), 16) - j * step;
            const b = parseInt(color[1].slice(5, 7), 16) - j * step;
            darkenedColor2.push(`rgb(${r},${g},${b})`);
        }
        darkenedColors.push([darkenedColor1, darkenedColor2]);
    }
    return darkenedColors;
}
/**
 * 获取基本材质
 * @param {*} color
 * @returns
 */
export function createBasicMaterial(color) {
    let c = getColor(color);
    const material = new THREE.MeshBasicMaterial({
        color: c.result,
        transparent: true,
        opacity: 0.01 * c.alpha,
        side: THREE.DoubleSide,
    });
    material.blending = THREE.NormalBlending;
    return material;
}
// 创建线性渐变颜色材质的函数
export function createLinearGradientMaterial(colors) {
    const [color1, color2] = colors;
    // 创建渐变贴图
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 256;
    gradientCanvas.height = 256;
    const gradientContext = gradientCanvas.getContext('2d');
    // 绘制径向渐变
    const gradient = gradientContext.createLinearGradient(0, 0, gradientCanvas.width, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    gradientContext.fillStyle = gradient;
    gradientContext.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);
    // 创建材质
    const texture = new THREE.CanvasTexture(gradientCanvas);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
    });
    material.blending = THREE.NormalBlending;
    return material;
}
