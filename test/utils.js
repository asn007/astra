import test from 'ava'
import {flatten, unflatten} from "../lib/utils";

const testObject = {
  'this': {
    'is': {
      'nested': 'yaay'
    },
    'another': 'level'
  },
  'this-is-not': 'nooo'
};

test('flatten will flatten object', t => {

  const result = flatten(testObject);
  t.is(Object.keys(result).length, 3);
  t.deepEqual(result, {
    'this:is:nested': 'yaay',
    'this:another': 'level',
    'this-is-not': 'nooo'
  });
});

test('unflatten will unflatten objects created by flatten', t => {
  t.deepEqual(testObject, unflatten(flatten(testObject)));
});
