import test from 'ava'
import {PlainStorage} from '../../lib/storages/plainstorage';
const P = require('bluebird');

test('will load keys into memory', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  t.deepEqual(result.get('this:is:nested'), 'yaay');
  t.deepEqual(result.get('this:another'), 'level');
  t.deepEqual(result.get('this-is-not'), 'nooo');
});

test('will return null for keys which are not defined', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  t.deepEqual(result.get('some-random-key'), null);
});

test('will return custom value for keys which are not defined', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  t.deepEqual(result.get('some-random-key', '123'), '123');
});

test('will do nothing on reload', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  await result.reload(P);
});

test('will set keys in memory', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  result.set('this:is:nested', 'nay');
  t.deepEqual(result.get('this:is:nested'), 'nay');
});

test('will set object keys in memory', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  result.set('this:is:nested', { we: { need: { to: { go: 'deeper' }}}});
  t.deepEqual(result.get('this:is:nested:we:need:to:go'), 'deeper');
});

test('will update keys once saved', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  result.set('this:is:nested', 'nay');
  await result.save(P);
  t.deepEqual(testObject.this.is.nested, 'nay');
});

test('will return whether key exists', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  t.is(result.has('this:is:nested'), true);
  t.is(result.has('asdasdd'), false);
});

test('will do nothing on save if set was not modified', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  await result.save(P);
});

test('will force update even if set was not modified', async t => {
  const testObject = {
    'this': {
      'is': {
        'nested': 'yaay'
      },
      'another': 'level'
    },
    'this-is-not': 'nooo'
  };
  const result = new PlainStorage(testObject);
  await result.load(P);
  result.markModified();
  await result.save(P);
});
