import invariant from 'invariant';
import { conformsTo, isFunction, isObject } from 'lodash';

export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };

  invariant(
    conformsTo(store, shape),
    '(client/redux/...) injectors: Expected a valid redux store',
  );
}
