export const shorten = (text, length = 10, ellipsisCount = 3) => {
  if (!(typeof text === "string" || text instanceof String)) {
    console.error(`expecting a string, ${typeof text} provided`);
    return "";
  }
  if (isNaN(length) || isNaN(ellipsisCount)) {
    console.error("length and ellipsisCount must be valid numbers");
    return;
  }

  if (text.length <= length) {
    return text;
  }
  const ellipsis = Array.from(Array(ellipsisCount))
    .map(() => ".")
    .join("");
  return `${text.substring(0, length)}${ellipsis}`;
};

export const slugify = (text) => {
  if (!(typeof text === "string" || text instanceof String)) {
    console.error(`string expected, ${typeof str} provided`);
    return str;
  }
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

/**
 * @param { string } str Pending string
 * @param  { number } type Remove space type 1 - all spaces 2 - before and after spaces 3 - before and after spaces 4 - after spaces default to 1
 */
export function trim(str, type = 1) {
  if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
  switch (type) {
    case 1:
      return str.replace(/\s/g, "");
    case 2:
      return str.replace(/(^\s)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s)/g, "");
    case 4:
      return str.replace(/(\s$)/g, "");
    default:
      return str;
  }
}

/**
 * @param { string } str String to be converted
 * @param { number } type 1-All capital 2 - all lowercase 3 - initial capital other - no conversion
 */

export function turnCase(str, type) {
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    default:
      return str;
  }
}

export function endsWith(value, ends, ignoreCase) {
  if (ignoreCase) {
    return (
      value.toLowerCase().charAt(value.length - str.length) == str.toLowerCase()
    );
  }

  return value.charAt(value.length - str.length) == str;
}

export function startsWith(value, stats, ignoreCase) {
  if (ignoreCase) {
    return value.toLowerCase().charAt(0) == str.toLowerCase();
  }

  return value.charAt(0) == str;
}
