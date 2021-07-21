import { select } from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct {
  constructor(menuProduct, element) {
    const thisCartProduct = this;
    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.params = menuProduct.params;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    /*thisCartProduct.amountWidget = menuProduct.amountWidget;*/
  
    thisCartProduct.getElements(element);
    console.log('thisCartProduct', thisCartProduct);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
  
  }
  
  getElements(element) {
    const thisCartProduct = this;
  
    thisCartProduct.dom = {};
  
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = element.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = element.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = element.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = element.querySelector(select.cartProduct.remove);
  }
  
  initActions() {
    const thisCartProduct = this;
  
    thisCartProduct.dom.edit.addEventListener('click', function (event) {
      event.preventDefault();
    });
    thisCartProduct.dom.remove.addEventListener('click', function (event) {
      event.preventDefault();
      thisCartProduct.remove();
    });
  }
    
  initAmountWidget() {
    const thisCartProduct = this;
      
    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('updated', function () {
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amount;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    });
  }
  
  remove() {
    const thisCartProduct = this;
  
    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
  
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }
  
  getData(){
    return {
      id: this.id,
      amount: this.amount,
      price: this.price,
      priceSingle: this.priceSingle,
      name: this.name,
      params: this.params,
    };
  }
}

export default CartProduct;