export const isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

export const isArrayEmpty = arr => arr === undefined || arr.length === 0;

export const parseErrors = errors => {
  let result = {};

  for (let key in errors) {
    for (let i = 0; i < errors[key].length; i++) {
      if (!errors[key][i].valid()) {
        Object.assign(result, {
          [key]: errors[key][i].message
        });

        break;
      }
    }
  }

  return result;
}
