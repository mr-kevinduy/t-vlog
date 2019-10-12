export const validateRequired = val => !val ? false : true;

export const validateEmail = val => {
  const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return val.indexOf('@') > 0 && valid.test(String(val).toLowerCase());
}

export const validateMax = (val, max) => val <= max;

export const validateMin = (val, min) => val >= min;

export const validateEqua = (val, val2) => val === val2;

export const validateBetween = (val, min, max) => (val >= min && val <= max);

export const validateMaxLength = (str, max) => validateMax(str.length, max);

export const validateMinLength = (str, min) => validateMin(str.length, min);

export const validateBetweenLength = (str, min, max) => validateBetween(str.length, min, max);
