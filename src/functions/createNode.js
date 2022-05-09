export default function createNode(tag, className) {
  const node = document.createElement(tag);
  if (className) node.classList.add(className);
  return node;
}
