import * as _ from './helpers';

const render = (vNode) => {
  if (_.isStringOrNumber(vNode)) {
    return document.createTextNode(vNode);
  }

  const { tagName, attrs, children } = vNode;
  const $el = document.createElement(tagName);

  for (const [key, val] of Object.entries(attrs)) {
    const lowerKey = key.toLowerCase();
    if (['onclick'].includes(lowerKey)) {
      $el.addEventListener(lowerKey.slice(2), val, false);
      // TODO: event delegation && remove eventListener on unmount
    } else {
      $el.setAttribute(key, val);
    }
  }

  for (const child of children) {
    const $child = render(child);
    $el.appendChild($child);
  }

  return $el;
};

export default render;
