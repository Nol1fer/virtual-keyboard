/* eslint-disable import/extensions */
// import languages from './languages/languages.js';
// import createNode from './functions/createNode.js';
// import Key from './classes/Key.js';
import Keyboard from './classes/Keyboard.js';

const keyboardTest = new Keyboard();
keyboardTest.generateKeyboard();
document.body.append(keyboardTest.keyboardNode);
