class MyButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      alert('hello');
    });
  }
}

window.customElements.define('my-button', MyButton, { extends: 'button' });
