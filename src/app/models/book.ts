import { triggerAsyncId } from "node:async_hooks";

export class Book {
    private _id: string;
    private _name: string;
    private _image: string;
    private _type: string;
    private _protagonists: string[];

    constructor() {
        this._id = "";
        this._name = "";
        this._image = "";
        this._type = "";
        this._protagonists = [];
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get image(): string {
        return this._image;
    }

    get type(): string {
        return this._type;
    }

    get protagonists(): string[] {
        return this._protagonists;
    }

    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this._name = name;
    }

    set image(image: string) {
        this._image = image;
    }

    set type(type: string) {
        this._type = type;
    }

    set protagonists(protagonists: string[]) {
        this._protagonists = protagonists;
    }


}
