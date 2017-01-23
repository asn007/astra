import {flatten, unflatten} from "../utils";
const fs = require('fs');

import {BaseStorage} from "./basestorage";

export class FileStorageOptions {
  constructor(public fileName: string, public encoding?: string) {
    if(!encoding) this.encoding = 'utf-8';
  }
}

export class FileStorage extends BaseStorage {
  private dictionary: Object;
  private flattenedDictionary: Object;

  constructor(private options: FileStorageOptions) {
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
    return new P((resolve, reject) => {
      fs.readFile(this.options.fileName, this.options.encoding, (err: NodeJS.ErrnoException, str: string) => {
        if(err) return reject(err);
        this.dictionary = JSON.parse(str);
        this.flattenedDictionary = flatten(this.dictionary);
        resolve(this.flattenedDictionary);
      });
    });
  }

  save(P: typeof Promise): Promise<any> {
    if(!this._modified) return new P((resolve, reject) => resolve());
    return new P((resolve, reject) => {
      this.dictionary = unflatten(this.flattenedDictionary);
      fs.writeFile(this.options.fileName, JSON.stringify(this.dictionary), this.options.encoding, (err: NodeJS.ErrnoException) => {
        if(err) return reject(err);
        this._modified = false;
        resolve();
      });
    });
  }

  reload(): Promise<any> {
    return undefined;
  }

}
