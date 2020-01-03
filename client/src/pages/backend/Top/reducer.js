import produce from 'immer';
import { TOP_ACTION } from './constants';

export const initialState = {
  topValue: '',
};

const topReducer = (state = initialState, action) => {
  produce(state, draft => {
    switch (action.type) {
      case TOP_ACTION:
        draft.topValue = action.topValue;
        break;
    }
  });
};

export default topReducer;
