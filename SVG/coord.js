/**
 *
 * @param {string} id
 * @returns {void}
 */
function draw(id) {
  const svg = document.querySelector(id);
  const NS = 'http://www.w3.org/2000/svg';

  svg.setAttribute('viewBox', '0 0 250 250');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#666666');
  path.setAttribute('stroke-width', '0.5');
  let d = '';
  for (let i = 0; i < 11; i++) {
    d += `M25 ${25 + i * 20} H225 `;
    d += `M${25 + i * 20} 25 V225 `;
  }
  path.setAttribute('d', d);
  if (svg.children.length > 0) {
    svg.insertBefore(path, svg.children[0]);
  } else {
    svg.appendChild(path);
  }
}
