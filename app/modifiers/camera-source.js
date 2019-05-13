import functionalModifier from 'ember-functional-modifiers';

export function cameraSource(element, [srcObject]) {
  element.srcObject = srcObject;
  element.autoplay = true;
}

export default functionalModifier(cameraSource);
