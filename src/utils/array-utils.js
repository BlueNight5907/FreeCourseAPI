export const removeDuplicates = (arr) => {
  if (!Array.isArray(arr)) {
    console.error(`array expected, ${typeof arr} provided`);
    return;
  }
  return [...new Set(arr)];
};

export const getDataFromAllSettled = (arr) => {
  return arr.reduce((result, item) => {
    if (item.status === "fulfilled") {
      result.push(item.value);
    }
    return result;
  }, []);
};

export function uniqBy(a, key) {
  var seen = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}
