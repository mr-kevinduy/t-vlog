import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { topAction } from './actions';
import { makeSelectTopValue } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Top({

}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div className="top-page">
      <p>This is top page</p>
    </div>
  );
}

Top.PropTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  topValue: PropTypes.string,
  onChangeTopValue: PropTypes.func,
  // onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
  topValue: makeSelectTopValue(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTopValue: evt => dispatch(topAction(evt.target.value)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo,
)(Top);
