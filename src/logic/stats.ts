/**
 * Generalización de las stats de un pokémon.
 */
export default class Stat {
  public readonly id: string;

  public readonly names: Dictionary<string>;

  public value = -1;

  constructor(id: string, names: Dictionary<string>) {
    this.id = id;
    this.names = names;
  }
}

type Dictionary<T> = { [id: string]: T };
