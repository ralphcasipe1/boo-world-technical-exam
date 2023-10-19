module.exports = function (propsToOmit, object) {
  if (!object || typeof object !== 'object') {
    return {};
  }

  const omitted = {};
  for (const prop in object) {
    if (object.hasOwnProperty(prop) && !propsToOmit.includes(prop)) {
      omitted[prop] = object[prop];
    }
  }

  return omitted;
}