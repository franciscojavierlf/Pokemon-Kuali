/**
 * El tipo de pokémon.
 */
export default class Type {
  public readonly id: string;

  public readonly names: Dictionary<string>;

  public doubleDamageFrom: Array<Type> = [];

  public doubleDamageTo: Array<Type> = [];

  public halfDamageFrom: Array<Type> = [];

  public halfDamageTo: Array<Type> = [];

  public noDamageFrom: Array<Type> = [];

  public noDamageTo: Array<Type> = [];

  constructor(id: string, names: Dictionary<string>) {
    this.id = id;
    this.names = names;
  }
}

type Dictionary<T> = { [id: string]: T };
