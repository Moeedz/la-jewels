/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var isDefined = customElements.get('localization-form');

if (!isDefined) {
  class LocalizationForm extends HTMLElement {
    constructor() {
      super();

      this.thing = 0;

      this.elements = {
        input: this.querySelector('input[name="language_code"],input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('ul'),
      };

      this.elements.button.addEventListener('click', this.openSelector.bind(this));
      this.elements.button.addEventListener('blur', this.closeSelector.bind(this));
      this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

      this.querySelectorAll('a').forEach(item => {
        // Handle both click and touch events for iOS compatibility
        item.addEventListener('click', this.onItemClick.bind(this));
        item.addEventListener('touchstart', this.onItemClick.bind(this), { passive: true });
      });
    }


    hidePanel() {
      this.elements.button.setAttribute('aria-expanded', 'false');
      this.elements.panel.setAttribute('hidden', true);
    }

    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;

      this.hidePanel();
      this.elements.button.focus();
    }

    onItemClick(event) {
      event.preventDefault();
      
      // Prevent double-firing on touch devices
      if (event.type === 'touchstart') {
        event.currentTarget.removeEventListener('click', this.onItemClick);
      }
      
      const form = this.querySelector('form');
      this.elements.input.value = event.currentTarget.dataset.value;
      
      if (form) {
        // Create and click a hidden submit button for Safari compatibility
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.style.display = 'none';
        form.appendChild(submitButton);
        submitButton.click();
        form.removeChild(submitButton);
      }
    }

    openSelector() {
      this.elements.button.focus();
      this.elements.panel.toggleAttribute('hidden');
      this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
    }

    closeSelector(event) {
      const shouldClose = !event.relatedTarget?.classList?.contains('disclosure__item_el');
      if (shouldClose) {
        this.hidePanel();
      }
    }
  }

  customElements.define('localization-form', LocalizationForm);
}
/******/ })()
;