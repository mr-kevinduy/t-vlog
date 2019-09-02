import _ from 'lodash';

export default function(errors) {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = ('message' in val) ? val.message : val.errmsg;
  });
  return result;
}
