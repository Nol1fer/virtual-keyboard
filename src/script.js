/* eslint-disable import/extensions */
import ru from './languages/ru.js';
import en from './languages/en.js';
// import createNode from './functions/createNode.js';
import Key from './classes/Key.js';

console.log(ru);
console.log(en);
// const key = createNode('div', 'key');
const realKey = new Key(en[0]);
console.log(realKey.keyNode);
document.body.append(realKey.keyNode);
console.log('Hello, World!');
