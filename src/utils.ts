const delimiter = ':';

export function flatten(o) {
  const output = {};
  function step(object, prev?, depth?) {
    depth = depth ? depth : 1;
    Object.keys(object).forEach((key: string) => {
      const value = object[key];
      const type = Object.prototype.toString.call(value);
      const isObject = (
        type === '[object Object]' ||
        type === '[object Array]'
      );

      const newKey = prev ? prev + delimiter + key : key;

      if(!Array.isArray(value) &&
        isObject && Object.keys(value).length)
        return step(value, newKey, depth + 1);
      output[newKey] = value;
    });
  }

  step(o);

  return output;
}

export function unflatten(o) {
  if(Object.prototype.toString.call(o) !== '[object Object]') return o;
  const result = {};

  Object.keys(o).forEach((key: string) => {
    const split = key.split(delimiter);
    let k1 = split.shift();
    let k2 = split[0];
    let receiver = result;
    while(k2 !== undefined) {

      const type = Object.prototype.toString.call(receiver[k1]);
      const isObject = (
        type === '[object Object]' ||
        type === '[object Array]'
      );


      if(!isObject) receiver[k1] = {};

      receiver = receiver[k1];

      if(split.length > 0) {
        k1 = split.shift();
        k2 = split[0];
      }
    }
    receiver[k1] = unflatten(o[key]);
  });
  return result;
}
