export function typeofUndefined(value) {
  return typeof value == "undefined" || value == null;
}

export function typeofObject(value) {
  return typeof value == "object" && value.constructor == Object;
}

export function typeofString(value) {
  return typeof value == "string" && value.constructor == String;
}

export function typeofBoolean(value) {
  return typeof value == "boolean" && value.constructor == Boolean;
}

export function typeofNumber(value) {
  return typeof value == "number" && value.constructor == Number;
}

export function typeofFunction(value) {
  return typeof value == "function" && value.constructor == Function;
}

export function typeofArray(value) {
  return typeof value == "object" && value.constructor == Array;
}

export function isNumeric(precision) {
  return new RegExp(
    "^-?((\\d{1," +
      (precision ? precision.length - precision.scale : "") +
      "}((\\.\\d{0," +
      (precision ? precision.scale : "") +
      "})?)))$"
  ).test(this);
}

export function isInteger(value) {
  return /^[0-9]{1,}$/.test(value);
}

export function optionManagement(options) {
  return function (name, defaultValue) {
    return typeofUndefined(options) || typeofUndefined(options[name])
      ? defaultValue
      : options[name];
  };
}
