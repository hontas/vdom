import createElement from './createElement';

export function h(name, attributes, ...children) {
  return createElement(name, { attrs: attributes || undefined, children });
}

export { createElement };
