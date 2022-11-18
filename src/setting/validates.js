export function checkEmpty(value) {
  if (value && value.toString().trim().length > 0) {
    return false;
  }
  return true;
}

export function checkUsername(value) {
  if (!/^(?=[a-zA-Z0-9._]{6,32}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value)) {
    return true;
  }
  return false;
}

export function checkPassword(value) {
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/.test(value)) {
    return true;
  }
  return false;
}

export function getLanguage(value) {
  return value;
}

export function checkEmail(value) {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    return true;
  }
  return false;
}

export function checkNumber(value) {
  if (!/^[-]?\d+(\.\d+)?$/.test(value)) {
    return true;
  }
  return false;
}
