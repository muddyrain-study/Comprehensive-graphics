/**
 *
 * @param {*} arg
 * @returns {xSpace, ratio}
 */
function draw(arg) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.querySelector(arg.id);
  const result = {};
  function drawBox(arg) {
    if (typeof arg === 'string') {
      arg = { id: string };
    }
    const config = {
      color: '#ccc',
      title: '标题',
      titleColor: '#000',
      xAxis: true,
      yAxis: true,
      count: 5,
      ...arg,
    };

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
    const space = 200 / config.count;
    for (let i = 0; i <= config.count; i++) {
      if (config.xAxis) {
        d += `M25 ${25 + i * space} H225 `;
      }
      if (config.yAxis) {
        d += `M${25 + i * space} 25 V225 `;
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

  function drawLabel(arg) {
    const config = {
      ...arg,
    };
    // 绘制底部文本
    if (config.xText && config.xText.length > 0) {
      const xSpace = 200 / config.xText.length;
      result.xSpace = xSpace;
      let g = document.createElementNS(NS, 'g');
      g.classList.add('x-line');
      svg.appendChild(g);
      let d = '';
      for (let i = 0; i <= config.xText.length; i++) {
        d += `M${25 + i * xSpace} 225 V230`;
      }
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', '#666666');
      path.setAttribute('stroke-width', '0.5px');
      g.appendChild(path);

      g = document.createElementNS(NS, 'g');
      g.classList.add('x-text');
      svg.appendChild(g);
      config.xText.map((item, index) => {
        const text = document.createElementNS(NS, 'text');
        text.innerHTML = item;
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('x', 25 + xSpace / 2 + index * xSpace);
        text.setAttribute('font-size', '5px');
        text.setAttribute('y', 232);
        g.appendChild(text);
      });
    }
    // 绘制左侧文本
    if (config.yMax > 0 && config.part > 0) {
      const upLimit = calcUpLimit(config.yMax);
      const yDataSpace = upLimit / config.part;
      const ratio = 200 / upLimit;
      result.ratio = ratio;
      const ySpace = 200 / config.part;
      const g = document.createElementNS(NS, 'g');
      g.classList.add('y-text');
      svg.appendChild(g);
      for (let i = 0; i <= config.part; i++) {
        const text = document.createElementNS(NS, 'text');
        text.setAttribute('x', 20);
        text.setAttribute('y', 225 - i * ySpace);
        text.innerHTML = i * yDataSpace;
        g.appendChild(text);
      }
    }
  }

  drawBox(arg);
  drawLabel(arg);
  return result;
}

function calcUpLimit(maxValue) {
  const leg = (maxValue + '').length;
  const unit = Math.pow(10, leg - 1);
  return maxValue % unit === 0
    ? maxValue
    : parseInt(maxValue / unit) * unit + unit;
}
