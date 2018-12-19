import { h } from './vdom';
import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff';
import { setState, subscribe } from './state';

const createVApp = ({ count, onClick }) => (
  <div id="app" dataCount={count}>
    <input placeholder="input" />
    {count}
    <button onClick={onClick}>click</button>
  </div>
);

const initialState = setState({
  count: 1,
  onClick() {
    setState((state) => ({
      count: state.count + 1
    }));
  }
});
subscribe((state) => reRender(state));

let vApp = createVApp(initialState);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById('app'));

function reRender(state) {
  const newVApp = createVApp(state);
  const patch = diff(vApp, newVApp);
  patch($rootEl);
  vApp = newVApp;
}
