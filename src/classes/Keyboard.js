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

    console.log(this.currentKeys);

    this.keyboardNode.addEventListener('mousedown', this.handleKeyEvent);
    this.keyboardNode.addEventListener('mouseup', this.handleKeyEvent);
    document.addEventListener('keydown', this.handleKeyEvent);
    document.addEventListener('keyup', this.handleKeyEvent);

    // debug
    document.addEventListener('keydown', (e) => {
      if (e.code === 'F11') {
        console.log(this.capslockState, this.currentLanguage);
      }
    });
  }

  handleKeyEvent = (event) => {
    event.preventDefault();
    console.log(event, event.type);
    const eventType = event.type;
    let eventCode;
    if (eventType === 'mousedown' || eventType === 'mouseup') {
      eventCode = this.handleMouse(event);
      if (!eventCode) return;
    } else {
      eventCode = event.code;
    }

    const key = this.currentKeys.find((keyInfo) => keyInfo.code === eventCode);
    if (!key) return;
    const { keyNode } = key;

    if (eventType === 'keydown' || eventType === 'keyup') keyNode.removeEventListener('mouseleave', this.handleMouseLeave);

    if (eventType === 'mousedown' || eventType === 'keydown') {
      keyNode.classList.add('pressed');

      // CapsLock
      if (eventCode === 'CapsLock') {
        this.capslockState = !this.capslockState;
      }
    } else {
      // CapsLock
      if (eventCode === 'CapsLock') {
        if (this.capslockState) return;
      }

      keyNode.removeEventListener('mouseleave', this.handleMouseLeave);

      keyNode.classList.remove('pressed');
    }
  };

  handleMouse = (event) => {
    const keyNode = event.target.closest('.key');
    if (!keyNode) return null;
    if (event.type === 'mousedown') keyNode.addEventListener('mouseleave', this.handleMouseLeave);
    return keyNode.dataset.code;
  };

  handleMouseLeave = (event) => {
    console.log(this.capslockState);

    const keyNode = event.target.closest('.key');
    const eventCode = keyNode.dataset.code;

    keyNode.removeEventListener('mouseleave', this.handleMouseLeave);

    if (eventCode === 'CapsLock') {
      if (this.capslockState) return;
    }

    keyNode.classList.remove('pressed');
  };
}
