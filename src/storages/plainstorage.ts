import {flatten, unflatten} from "../utils";
const fs = require('fs');

import {BaseStorage} from "./basestorage";

export class PlainStorage extends BaseStorage {
  private dictionary: Object;
  private flattenedDictionary: Object;

  constructor(private object: Object) {
    super();
  }

  get(key: string, defaultValue?: any): any {
    const tKey = this.flattenedDictionary[key];
    return tKey ? tKey : (defaultValue ? defaultValue : null);
  }

  set(key: string, value: any) {
    this.markModified();
    const type = Object.prototype.toString.call(value);
    const isObject = (
      type === '[object Object]'
    );
    if(isObject) {
      const flattened = flatten(value);
      Object.keys(flattened).forEach((flattenedKey: string) => {
        this.flattenedDictionary[key + ':' + flattenedKey] = flattened[flattenedKey];
      });
    } else this.flattenedDictionary[key] = value;
  }

  has(key: string): boolean {
    return Boolean(this.get(key, false));
  }

  load(P: typeof Promise): Promise<any> {
    return new P((resolve) => {
      this.dictionary = this.object;
      this.flattenedDictionary = flatten(this.object);
      resolve(this.flattenedDictionary);
    });
  }

  save(P: typeof Promise): Promise<any> {
    if(!this._modified) return P.resolve();
    return new P((resolve) => {
      this.dictionary = unflatten(this.flattenedDictionary);
      // FIXME: figura out something about complexity
      for(let key of Object.keys(this.object)) delete this.object[key];
      for(let key of Object.keys(this.dictionary)) this.object[key] = this.dictionary[key];
      this._modified = false;
      return resolve();
    });
  }

  reload(P: typeof Promise): Promise<any> {
    return P.resolve();
  }

}
