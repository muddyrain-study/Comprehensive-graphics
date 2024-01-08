class CustomButton extends HTMLElement {
  constructor() {
    super();
    const name = this.getAttribute('name');
    const url = this.getAttribute('url');
    const price = this.getAttribute('price');
    // this.innerHTML = `
    // <style>
    //   button{
    //     color: red;
    //   }
    // </style>
    // `
    const btn = document.createElement('button');
    btn.innerText = 'hello button';
    btn.addEventListener('click', () => {
      alert('hello');
      this.setAttribute('name', 'new name');
      this.setAttribute('url', 'new url');
      this.setAttribute('price', 'new price');
    });
    // this.appendChild(btn);

    const template = document.getElementById('app-template');
    const cloneElement = template.content.cloneNode(true);
    cloneElement.querySelector("input[type='text']").value = `$${price}`;

    // 创建一个 shadow root
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      button{
        color: red;
      }
    </style>`;
    this.shadowRoot.appendChild(btn);
    this.shadowRoot.appendChild(cloneElement);
  }
  connectedCallback() {
    console.log('connected');
  }
  disconnectedCallback() {
    console.log('disconnected');
  }
  adoptedCallback() {
    console.log('adopted');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChanged', name, oldValue, newValue);
  }
  static get observedAttributes() {
    return ['name', 'url', 'price'];
  }
}

window.customElements.define('custom-button', CustomButton);
