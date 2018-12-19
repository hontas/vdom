let _state = {};
const listeners = new Set();

export const getState = () => ({
  ..._state
});

export function setState(update) {
  if (!update) return;
  if (typeof update === 'function') {
    update = update(getState());
  }

  _state = {
    ..._state,
    ...update
  };

  const newState = getState();
  for (const listener of listeners) {
    listener(newState);
  }
  return newState;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
