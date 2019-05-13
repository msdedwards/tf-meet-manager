import functionalModifier from 'ember-functional-modifiers';
import JsBarcode from 'jsbarcode';


export function barcode(element, params) {
  JsBarcode("#"+element.id, params[0], {
    height: 25,
    displayValue: false,
  });
}

export default functionalModifier(barcode);
