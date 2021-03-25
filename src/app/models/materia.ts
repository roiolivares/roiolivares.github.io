import { triggerAsyncId } from "node:async_hooks";

export class Materia {
    private _id: string;
    private _nomMateria: string;
    private _unitatFormativa: string;
    private _practica: string[];

    constructor() {
        this._id = "";
        this._nomMateria = "";
        this._unitatFormativa = "";
        this._practica = [];
    }

    get id(): string {
        return this._id;
    }

    get nomMateria(): string {
        return this._nomMateria;
    }

    get unitatFormativa(): string {
        return this._unitatFormativa;
    }

    get practica(): string[] {
        return this._practica;
    }

    set id(id: string) {
        this._id = id;
    }

    set nomMateria(nomMateria: string) {
        this._nomMateria = nomMateria;
    }

    set unitatFormativa(unitatFormativa: string) {
        this._unitatFormativa = unitatFormativa;
    }

    set practica(practica: string[]) {
        this._practica = practica;
    }
}
