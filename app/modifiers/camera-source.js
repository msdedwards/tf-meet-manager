import makeFunctionalModifier from 'ember-functional-modifiers';

export default makeFunctionalModifier((element, [srcObject]) => {
  element.srcObject = srcObject;
  element.autoplay = true;
});
