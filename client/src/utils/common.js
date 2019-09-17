// const errors = ;

export const validateEmail = val => {
  const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return valid.test(String(val).toLowerCase());
}

export const parseErrors = errors => {
  let result = [];

  for (let key in errors) {
    for (let i = errors[key].valid.length - 1; i >= 0; i--) {
      if (!errors[key].valid[i].valid(errors[key].value)) {
        result.push({
          [key]: errors[key].valid[i].message
        });

        break;
      }
    }

    // if (! isArrayEmpty(result)) break;
  }

  return result;
}

export const isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;
export const isArrayEmpty = arr => arr === undefined || arr.length == 0;
