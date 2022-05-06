/* eslint-disable import/extensions */
import Key from './Key.js';
import createNode from '../functions/createNode.js';
import languages from '../languages/languages.js';

const keysInRows = [14, 15, 13, 13, 9];

export default class Keyboard {
  constructor() {
    this.capslockState = false;
    this.shiftLeftState = false;
    this.shiftRightState = false;
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
        console.log(
          this.capslockState,
          this.shiftLeftState,
          this.shiftRightState,
          this.currentLanguage,
        );
      }
    });
  }

  handleKeyEvent = (event) => {
    event.preventDefault();
    const eventType = event.type;

    let eventCode;
    if (eventType === 'mousedown' || eventType === 'mouseup') {
      eventCode = this.handleMouse(event);
      if (!eventCode) return;
    } else {
      eventCode = event.code;
    }

    console.log(event.type, eventCode);

    const keyInstance = this.currentKeys.find((keyInfo) => keyInfo.code === eventCode);
    if (!keyInstance) return;
    const { keyNode } = keyInstance;

    if (eventType === 'mousedown' || eventType === 'keydown') {
      // CapsLock-down
      if (eventCode === 'CapsLock') {
        this.capslockState = !this.capslockState;
        this.keyboardNode.classList.toggle('letter-up');
      }
      // Shift-down
      if ((eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') && (this.shiftLeftState || this.shiftRightState)) return;
      if (eventCode === 'ShiftLeft' && !this.shiftLeftState) {
        this.shiftLeftState = true;
        this.keyboardNode.classList.toggle('letter-up');
        this.keyboardNode.classList.toggle('symbol-up');
      }
      if (eventCode === 'ShiftRight' && !this.shiftRightState) {
        this.shiftRightState = true;
        this.keyboardNode.classList.toggle('letter-up');
        this.keyboardNode.classList.toggle('symbol-up');
      }

      keyNode.classList.add('pressed');
    } else {
      // CapsLock-up
      if (eventCode === 'CapsLock') {
        if (this.capslockState) return;
      }
      // Shift-up
      if (eventCode === 'ShiftLeft' && this.shiftLeftState) {
        this.shiftLeftState = false;
        this.keyboardNode.classList.toggle('letter-up');
        this.keyboardNode.classList.toggle('symbol-up');
      }
      if (eventCode === 'ShiftRight' && this.shiftRightState) {
        this.shiftRightState = false;
        this.keyboardNode.classList.toggle('letter-up');
        this.keyboardNode.classList.toggle('symbol-up');
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
    // console.log(this.capslockState);

    const keyNode = event.target.closest('.key');
    const eventCode = keyNode.dataset.code;

    keyNode.removeEventListener('mouseleave', this.handleMouseLeave);

    // CapsLock-mouseleave
    if (eventCode === 'CapsLock') {
      if (this.capslockState) return;
    }
    // Shift-mouseleave
    if (eventCode === 'ShiftLeft' && this.shiftLeftState) {
      this.shiftLeftState = false;
      this.keyboardNode.classList.toggle('letter-up');
      this.keyboardNode.classList.toggle('symbol-up');
    }
    if (eventCode === 'ShiftRight' && this.shiftRightState) {
      this.shiftRightState = false;
      this.keyboardNode.classList.toggle('letter-up');
      this.keyboardNode.classList.toggle('symbol-up');
    }

    keyNode.classList.remove('pressed');
  };
}
