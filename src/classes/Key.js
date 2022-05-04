/* eslint-disable import/extensions */
import createNode from '../functions/createNode.js';

const functionalKeys = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const smallKeys = ['Tab'];
const mediumKeys = ['CapsLock', 'ShiftRight'];
const largeKeys = ['Backspace', 'Enter', 'ShiftLeft'];
const symbolKeys = ['`', '-', '=', '[', ']', '\\', ';', "'", ',', '.', '/'];

export default class Key {
  constructor({ base, mod, code }) {
    this.base = base;
    this.mod = mod;
    this.code = code;
    this.isFn = functionalKeys.includes(this.code);
    this.keyNode = this.createKeyNode();
  }

  createKeyNode() {
    const keyBase = createNode('span', 'key__base');
    keyBase.append(this.base);
    const keyMod = createNode('span', 'key__mod');
    if (this.mod !== null) keyMod.append(this.mod);

    const keyContainer = createNode('div', 'key');
    keyContainer.append(keyBase, keyMod);

    if (this.isFn) {
      if (smallKeys.includes(this.code)) keyContainer.classList.add('key_size-s');
      if (mediumKeys.includes(this.code)) keyContainer.classList.add('key_size-m');
      if (largeKeys.includes(this.code)) keyContainer.classList.add('key_size-l');
      if (this.code === 'Space') keyContainer.classList.add('key_size-xl');
    } else if (/[a-zа-яё]/.test(this.base)) {
      keyContainer.classList.add('key_letter');
    } else if (/[0-9]/.test(this.base) || symbolKeys.includes(this.base)) {
      keyContainer.classList.add('key_symbol');
    }
    return keyContainer;
  }
}
