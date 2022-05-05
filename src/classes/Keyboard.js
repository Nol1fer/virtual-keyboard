/* eslint-disable import/extensions */
import Key from './Key.js';
import createNode from '../functions/createNode.js';
import languages from '../languages/languages.js';

const keysInRows = [14, 15, 13, 13, 9];

export default class Keyboard {
  constructor() {
    this.capslockState = false;
    this.pressedKeys = new Set();
    this.keyboardNode = createNode('div', 'keyboard');
    this.currentLanguage = 0;
  }

  generateKeyboard() {
    this.currentKeys = [];
    let currentKey = 0;
    this.keyboardNode.innerHtml = '';

    keysInRows.forEach((rowLength) => {
      const rowNode = createNode('div', 'keyboard__row');

      const keyNodes = languages[this.currentLanguage]
        .slice(currentKey, currentKey + rowLength)
        .map((keyInfo) => {
          const keyInstance = new Key(keyInfo);
          this.currentKeys.push(keyInstance);
          return keyInstance.keyNode;
        });
      rowNode.append(...keyNodes);
      this.keyboardNode.append(rowNode);

      currentKey += rowLength;
    });
  }
}
