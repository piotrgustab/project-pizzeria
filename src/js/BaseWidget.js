class BaseWidget {  
    constructor(wrapperElement, initialValue){
      const thisWidget = this;
      
      thisWidget.dom = {};
      thisWidget.dom.wrapper = wrapperElement;
  
      thisWidget.correctValue = initialValue; 
    }
  
    get value() {   
      const thisWidget = this;
  
      return thisWidget.correctValue;
    }
  
    set value(value) { 
  
      const thisWidget = this;
  
      const newValue = thisWidget.parseValue(value); 
  
  
      
      if (newValue != thisWidget.correctValue && thisWidget.isValid(newValue)) {
        thisWidget.correctValue = newValue;
      }
      thisWidget.renderValue();
      thisWidget.announce();
    }
  
    setValue(value) {   
      const thisWidget = this;
  
      thisWidget.value = value; 
    }
  
    parseValue(value) { 
  
      return parseInt(value);
    }
  
  
    isValid(value) {    // isValid zostaje w obu klasach bo się różnią
  
      return !isNaN(value);  // jeśli value jest tekstem to isNaN jest prawdziwa
    }
  
    renderValue() { // bieżąca wartość widgetu będzie wyświetlona na stronie
      const thisWidget = this;
  
      thisWidget.dom.wrapper.innerHTML = thisWidget.value; // zmieniamy na wrapper bo nie wiadomo czy będzie input czy nie
    }
  
    announce() {    // przenosimy z AmountWidget bo nie ma specyficznych informacji dla widgetu ilości, jest uniwersalna
      const thisWidget = this;
  
      const event = new CustomEvent('updated', {
        bubbles: true
      });
      thisWidget.dom.wrapper.dispatchEvent(event);
    }
  }
  
  export default BaseWidget;