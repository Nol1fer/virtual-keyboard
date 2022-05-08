/* eslint-disable import/extensions */
// import languages from './languages/languages.js';
import createNode from './functions/createNode.js';
// import Key from './classes/Key.js';
import Keyboard from './classes/Keyboard.js';

const wrapper = createNode('div', 'wrapper');
document.body.append(wrapper);
const textArea = createNode('textarea', 'input');
wrapper.append(textArea);

const keyboardTest = new Keyboard();
keyboardTest.generateKeyboard();
wrapper.append(keyboardTest.keyboardNode);

const system = createNode('p');
system.innerHTML = 'Клавиатура создана в операционной системе Windows';
wrapper.append(system);

const switchLang = createNode('p');
switchLang.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';
wrapper.append(switchLang);
