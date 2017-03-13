import {DoublyLinkedList} from "./doublylinkedlist";
import {BaseStorage} from "./storages/basestorage";
import {flatten} from "./utils";

// TODO: implement atomic object merging

export enum AstraMergeBehaviour {
  DIFF_MERGE, ATOMIC_MERGE
}

export enum AstraSaveBehaviour {
  PROPAGATE_ACROSS_STORAGES, UPDATE_LAST
}

class Astra {
  public Astra: typeof Astra;
  public static Promise: typeof Promise = Promise;
  private _overrides: Object = {};
  private _flattenedOverrides: Object = {};
  private _keyMap: Object = {};
  public storages: DoublyLinkedList<BaseStorage> = new DoublyLinkedList<BaseStorage>();
  constructor(public mergeBehaviour: AstraMergeBehaviour = AstraMergeBehaviour.DIFF_MERGE,
              public saveBehaviour: AstraSaveBehaviour) {  }


  // TODO: figure out parallel loading and sequential indexing

  public async load() {
    let storage: BaseStorage = this.storages.first();
    let sequence = Astra.Promise.resolve();

    while(storage) {
      let st = storage;
      sequence.then(() => storage.load(Astra.Promise)).then((dict) => {
        Object.keys(dict).forEach(key => {
          if(!this._keyMap[key])
            this._keyMap[key] = [ st ];
          else
            this._keyMap[key].push(st);
      })});
      storage = <BaseStorage> storage._next;
    }
    return sequence;
  }

  public async save() {
    const promises = [];
    let storage: BaseStorage = this.storages.first();
    while(storage) {
      promises.push(storage.save(Astra.Promise));
      storage = <BaseStorage> storage._next;
    }
    return Astra.Promise.all(promises);
  }

  public register(storage: BaseStorage) {
    this.storages.add(storage);
  }

  public unregister(storage: BaseStorage) {
    this.storages.remove(storage);
  }

  public get(key: string, defaultValue?: any): any {
    const override = this._flattenedOverrides[key];
    if(override) return override;
    let tempValue = defaultValue ? defaultValue : null;
    let storage: BaseStorage = this.storages.first();
    while(storage) {
      let tX = storage.get(key, false);
      if(tX) tempValue = tX;
      storage = <BaseStorage> storage._next;
    }
    return tempValue;
  }

  public set(key: string, value: any) {
    if(!this._keyMap[key])
      this._keyMap[key] = [ this.storages.last() ];
    let arr = this._keyMap[key];
    for(let i = this.saveBehaviour == AstraSaveBehaviour.PROPAGATE_ACROSS_STORAGES ? 0 : arr.length - 1; i < arr.length; i++) arr[i].set(key, value);
  }

  public has(key: string): boolean {
    return Boolean(this.get(key, false));
  }

  public overrides(kv: Object) {
    this._overrides = kv;
    this._flattenedOverrides = flatten(this._overrides);
  }

}

const __instance:Astra = new Astra(AstraMergeBehaviour.DIFF_MERGE, AstraSaveBehaviour.UPDATE_LAST);
__instance.Astra = Astra;

module.exports = __instance;
