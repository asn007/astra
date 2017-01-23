declare module 'astra' {
	export class DoublyLinkedList<T extends DoublyLinkedListItem> {
	    private _first;
	    private _last;
	    private length;
	    first(): T;
	    last(): T;
	    insertAfter(node: T, newNode: T): void;
	    insertBefore(node: T, newNode: T): void;
	    insertAtBeginning(node: T): void;
	    add(node: T): void;
	    remove(node: T): void;
	    pop(): T;
	    shift(): T;
	    toArray(): T[];
	}
	export abstract class DoublyLinkedListItem {
	    _prev: DoublyLinkedListItem;
	    _next: DoublyLinkedListItem;
	}
  export abstract class BaseStorage extends DoublyLinkedListItem {
    _prev: BaseStorage;
    _next: BaseStorage;
    protected _modified: boolean;
    abstract get(key: string, defaultValue?: any): any;
    abstract set(key: string, value: any): any;
    abstract has(key: string): boolean;
    abstract load(P: typeof Promise): Promise<any>;
    abstract save(P: typeof Promise): Promise<any>;
    abstract reload(): Promise<any>;
    markModified(): void;
  }
  export function flatten(o: any): {};
  export function unflatten(o: any): any;
  export enum AstraMergeBehaviour {
    DIFF_MERGE = 0,
  }
  export enum AstraSaveBehaviour {
    PROPAGATE_ACROSS_STORAGES = 0,
    UPDATE_LAST = 1,
  }
  export class FileStorageOptions {
    fileName: string;
    encoding: string;
    constructor(fileName: string, encoding?: string);
  }
  export class FileStorage extends BaseStorage {
    private options;
    private dictionary;
    private flattenedDictionary;
    constructor(options: FileStorageOptions);
    get(key: string, defaultValue?: any): any;
    set(key: string, value: any): void;
    has(key: string): boolean;
    load(P: typeof Promise): Promise<any>;
    save(P: typeof Promise): Promise<any>;
    reload(): Promise<any>;
  }

  export class PlainStorage extends BaseStorage {
    private object;
    private dictionary;
    private flattenedDictionary;
    constructor(object: Object);
    get(key: string, defaultValue?: any): any;
    set(key: string, value: any): void;
    has(key: string): boolean;
    load(P: typeof Promise): Promise<any>;
    save(P: typeof Promise): Promise<any>;
    reload(): Promise<any>;
  }
}
