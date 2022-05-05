/* eslint-disable import/extensions */
import languages from './languages/languages.js';
// import createNode from './functions/createNode.js';
import Key from './classes/Key.js';
import Keyboard from './classes/Keyboard.js';

console.log(languages[0]);
console.log(languages[1]);
// const key = createNode('div', 'key');
const realKey = new Key(languages[0][17]);
console.log(realKey.keyNode);
document.body.append(realKey.keyNode);
console.log('Hello, World!');

const keyboardTest = new Keyboard();
keyboardTest.generateKeyboard();
document.body.append(keyboardTest.keyboardNode);
