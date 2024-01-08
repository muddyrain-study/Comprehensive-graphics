class ImageBox extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const url = this.getAttribute('url');
    const title = this.getAttribute('title');
    const price = this.getAttribute('price');

    this.attachShadow({ mode: 'open' });

    const imageBoxTemplate = document.getElementById('image-box-template');
    const imageBoxContent = imageBoxTemplate.content.cloneNode(true);

    // 填入属性
    imageBoxContent.querySelector('img').setAttribute('src', url);
    imageBoxContent.querySelector('div.title').innerHTML = title;
    imageBoxContent.querySelector('div.price').innerHTML = `$${price}`;

    this.shadowRoot.appendChild(imageBoxContent);
  }
}

window.customElements.define('image-box', ImageBox);
