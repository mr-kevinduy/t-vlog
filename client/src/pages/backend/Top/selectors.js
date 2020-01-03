import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTop = state => state.top || initialState;

const makeSelectTopValue = () =>
  createSelector(
    selectTop,
    topState => topState.topValue,
  );

export { selectTop, makeSelectTopValue };
