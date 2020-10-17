import { Dictionary } from 'vue-router/types/router';


export default class Type {
  public readonly id: string;
  
  #names: Dictionary<string> = {};

  #doubleDamageFrom: Array<Type> = [];

  #doubleDamageTo: Array<Type> = [];

  #halfDamageFrom: Array<Type> = [];

  #halfDamageTo: Array<Type> = [];

  #noDamgeFrom: Array<Type> = [];

  #noDamageTo: Array<Type> = [];

  constructor(id: string) {
    this.id = id;
  }

  getName(lang: string) {
    return this.#names[lang];
  }

  get doubleDamageFrom() {
    return this.#doubleDamageFrom;
  }

  get doubleDamageTo() {
    return this.#doubleDamageTo;
  }

  get halfDamageFrom() {
    return this.#halfDamageFrom;
  }

  get halfDamageTo() {
    return this.#halfDamageTo;
  }

  get noDamageFrom() {
    return this.#noDamgeFrom;
  }

  get noDamageTo() {
    return this.#noDamageTo;
  }

  public setNames(names: Dictionary<string>) {
    this.#names = names;
  }

  public setDoubleDamageFrom(arr: Array<Type>) {
    this.#doubleDamageFrom = arr;
  }

  public setDoubleDamageTo(arr: Array<Type>) {
    this.#doubleDamageTo = arr;
  }

  public setHalfDamageFrom(arr: Array<Type>) {
    this.#halfDamageFrom = arr;
  }

  public setHalfDamageTo(arr: Array<Type>) {
    this.#halfDamageTo = arr;
  }

  public setNoDamageFrom(arr: Array<Type>) {
    this.#noDamgeFrom = arr;
  }

  public setNoDamageTo(arr: Array<Type>) {
    this.#noDamageTo = arr;
  }
}