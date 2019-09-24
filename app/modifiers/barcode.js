import functionalModifier from 'ember-functional-modifiers';
import JsBarcode from 'jsbarcode';

/**
 * Creates JsBarcode Object
 * @param {element} element 
 * @param {array} params 
 */
export function barcode(element, params) {
  JsBarcode("#" + element.id, params[0], {
    height: 25,
    displayValue: false,
  });
}

export default functionalModifier(barcode);
