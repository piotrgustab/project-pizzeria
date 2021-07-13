class Cart {
    constructor(element) {
      const thisCart = this;
  
      thisCart.products = [];
  
      thisCart.getElements(element);
  
      console.log('new Cart', thisCart);
  
      thisCart.initActions();
    }
  
    getElements(element) {
      const thisCart = this;
  
      thisCart.dom = {};
  
      thisCart.dom.wrapper = element;
      thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
      thisCart.dom.productList = element.querySelector(select.cart.productList);
      thisCart.dom.deliveryFee = element.querySelector(select.cart.deliveryFee);
      thisCart.dom.subTotalPrice = element.querySelector(select.cart.subTotalPrice);
      thisCart.dom.totalPrice = element.querySelectorAll(select.cart.totalPrice);
      thisCart.dom.totalNumber = element.querySelector(select.cart.totalNumber);
      thisCart.dom.form = element.querySelector(select.cart.form);
      thisCart.dom.address = element.querySelector(select.cart.address);
      thisCart.dom.phone = element.querySelector(select.cart.phone);
    }
  
    initActions() {
  
      const thisCart = this;
  
      thisCart.dom.toggleTrigger.addEventListener('click', function () {
        thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
      });
  
      thisCart.dom.productList.addEventListener('updated', function () {
        thisCart.update();
      });
  
      thisCart.dom.productList.addEventListener('remove', function (event) {
        thisCart.remove(event.detail.cartProduct);
      });
      thisCart.dom.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisCart.sendOrder();
      });
    }
  
    sendOrder() {
      const thisCart = this;
  
      const payload = {
        address: thisCart.dom.address.value,
        phone: thisCart.dom.phone.value, 
        totalPrice: thisCart.totalPrice,
        amount: thisCart.totalNumber,
        products: []
      };
  
      for (let prod of thisCart.products) {
        payload.products.push(prod.getData());
      }
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      const url = settings.db.url + '/' + settings.db.orders; // //locahost:3131/orders
  
      fetch(url, options);
    }
  
    add(menuProduct) {
      const thisCart = this;
  
      const generatedHTML = templates.cartProduct(menuProduct);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
  
      /* add element to menu */
  
      thisCart.dom.productList.appendChild(generatedDOM);
  
      console.log('adding product', menuProduct);
  
      thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
      console.log('thisCart.products', thisCart.products);
  
      thisCart.update();
  
    }
  
    update() {
  
  
      const thisCart = this;
      thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
  
      thisCart.totalNumber = 0;
      thisCart.subTotalPrice = 0;
  
      for (let product of thisCart.products) {
        thisCart.totalNumber += product.amount;
        thisCart.subTotalPrice += product.price;
      }
  
      if (thisCart.totalNumber == 0) {
        thisCart.totalPrice = 0;
        thisCart.deliveryFee = 0;
      } else {
        thisCart.totalPrice = thisCart.subTotalPrice + thisCart.deliveryFee;
      }
      console.log('totalPrice', thisCart.totalPrice);
      console.log('totalNumber', thisCart.totalNumber);
      console.log('subTotalPrice', thisCart.subTotalPrice);
      console.log('deliveryFee', thisCart.deliveryFee);
      thisCart.dom.deliveryFee.innerHTML = thisCart.deliveryFee;
      thisCart.dom.subTotalPrice.innerHTML = thisCart.subTotalPrice;
      for (let selector of thisCart.dom.totalPrice) {
        selector.innerHTML = thisCart.totalPrice;
      }
      thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
  
    }
  
    remove(CartProduct) {
  
      const thisCart = this;
      const indexOfProduct = thisCart.products.indexOf(CartProduct);
      thisCart.products.splice(indexOfProduct, 1);
  
      CartProduct.dom.wrapper.remove();
  
      thisCart.update();
  
    }
  
  }

export default 'Cart';