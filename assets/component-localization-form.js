/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var isDefined = customElements.get('localization-form');

if (!isDefined) {
  class LocalizationForm extends HTMLElement {
    constructor() {
      super();

      this.thing = 0;
      this.hasSubmitted = false;

      this.elements = {
        input: this.querySelector('input[name="language_code"],input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('ul'),
      };

      this.elements.button.addEventListener('click', this.openSelector.bind(this));
      // REMOVED blur listener - might be interfering on macOS Safari
      // this.elements.button.addEventListener('blur', this.closeSelector.bind(this));
      this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

      this.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', this.onItemClick.bind(this));
        item.addEventListener('touchend', this.onItemClick.bind(this));
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
      console.log('onItemClick triggered', event.type);
      event.preventDefault();
      event.stopPropagation();
      
      // Prevent double-firing
      if (this.hasSubmitted) {
        console.log('Already submitted, skipping');
        return;
      }
      this.hasSubmitted = true;
      
      const form = this.querySelector('form');
      const selectedValue = event.currentTarget.dataset.value;
      
      console.log('Selected value:', selectedValue);
      console.log('Form found:', !!form);
      
      // Update the hidden input
      this.elements.input.value = selectedValue;
      
      if (form) {
        console.log('Attempting form submission...');
        
        // Method 1: Try requestSubmit (modern browsers)
        if (typeof form.requestSubmit === 'function') {
          console.log('Using requestSubmit');
          try {
            form.requestSubmit();
            return;
          } catch (e) {
            console.log('requestSubmit failed:', e);
          }
        }
        
        // Method 2: Create submit input and click it
        console.log('Using submit input method');
        try {
          const submitInput = document.createElement('input');
          submitInput.type = 'submit';
          submitInput.style.position = 'absolute';
          submitInput.style.left = '-9999px';
          form.appendChild(submitInput);
          submitInput.click();
          setTimeout(() => form.removeChild(submitInput), 100);
          return;
        } catch (e) {
          console.log('Submit input method failed:', e);
        }
        
        // Method 3: Native form.submit() with delay
        console.log('Using native form.submit()');
        setTimeout(() => {
          try {
            HTMLFormElement.prototype.submit.call(form);
          } catch (e) {
            console.log('Native submit failed:', e);
            // Method 4: Regular submit as last resort
            form.submit();
          }
        }, 50);
      }
      
      // Reset flag
      setTimeout(() => {
        this.hasSubmitted = false;
      }, 2000);
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