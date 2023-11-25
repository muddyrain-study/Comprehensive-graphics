import { Pie } from './Pie';

new Pie(document.getElementById('container') as HTMLElement, {
  //颜色
  colors: [
    ['#5dc7df', '#4191b1'],
    ['#f4b75e', '#f6c469'],
    ['#b1f1d5', '#72dd94'],
    ['#73c7ee', '#5aa9e4'],
  ],
  //数据
  data: [
    { name: '小学', value: 4 },
    { name: '中学', value: 3 },
    { name: '大学', value: 2 },
    { name: '2学', value: 1 },
  ],
  planeImage: '/plane.png',
});
