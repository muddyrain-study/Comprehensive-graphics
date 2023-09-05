import $ from 'jquery';
import news from './news';
import now from 'home/now';
// 生成活动页标题
$('<h1>').text('活动页').appendTo(document.body);

// 活动页中有一个新闻列表
news($('<div>').appendTo(document.body));

// 首页中有一个显示当前时间的区域
now($('<div>').appendTo(document.body));
