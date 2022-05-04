/* eslint-disable import/extensions */
import ru from './languages/ru.js';
import en from './languages/en.js';
import createNode from './functions/createNode.js';

console.log(ru);
console.log(en);
const key = createNode('div', 'key');
document.body.append(key);
console.log('Hello, World!');
