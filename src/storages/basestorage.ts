import {DoublyLinkedListItem} from "../doublylinkedlist";
export abstract class BaseStorage extends DoublyLinkedListItem {
  _prev: BaseStorage;
  _next: BaseStorage;
  protected _modified: boolean = false;
  public abstract get(key: string, defaultValue?: any): any;
  public abstract set(key: string, value: any);
  public abstract has(key: string) : boolean;
  public abstract load(P: typeof Promise): Promise<any>;
  public abstract save(P: typeof Promise): Promise<any>;
  public abstract reload():  Promise<any>;
  public markModified() { this._modified = true; }
}
