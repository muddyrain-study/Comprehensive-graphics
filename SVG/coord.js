/**
 *
 * @param {string |
 *  {
 *  id:string;
 *  color:string;
 *  xAxis:boolean;
 *  yAxis:boolean;
 *  title:string;
 *  }
 * } arg
 * @returns {void}
 */
function draw(arg) {
  if (typeof arg === 'string') {
    arg = { id: string };
  }
  const config = {
    color: '#ccc',
    title: '标题',
    titleColor: '#000',
    xAxis: true,
    yAxis: true,
    ...arg,
  };
  const svg = document.querySelector(config.id);
  const NS = 'http://www.w3.org/2000/svg';

  svg.setAttribute('viewBox', '0 0 250 250');
  const path = document.createElementNS(NS, 'path');
  const g = document.createElementNS(NS, 'g');
  const title = document.createElementNS(NS, 'text');
  title.innerHTML = config.title;
  title.setAttribute('x', '10');
  title.setAttribute('y', '15');
  title.setAttribute('fill', `${config.titleColor}`);
  title.setAttribute('font-size', '8');
  g.appendChild(title);
  path.setAttribute('stroke', `${config.color}`);
  path.setAttribute('stroke-width', '0.5');
  let d = '';
  for (let i = 0; i < 11; i++) {
    if (config.xAxis) {
      d += `M25 ${25 + i * 20} H225 `;
    }
    if (config.yAxis) {
      d += `M${25 + i * 20} 25 V225 `;
    }
  }
  path.setAttribute('d', d);
  g.appendChild(path);
  if (svg.children.length > 0) {
    svg.insertBefore(g, svg.children[0]);
  } else {
    svg.appendChild(g);
  }
}
