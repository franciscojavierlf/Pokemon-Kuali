import { Dictionary } from 'vue-router/types/router';

/**
 * Generalización de las stats de un pokémon.
 */
export default class Stat {
  public readonly id: string;

  public readonly names: Dictionary<string>;

  public readonly value: number;

  constructor(id: string, names: Dictionary<string>, value: number) {
    this.id = id;
    this.names = names;
    this.value = value;
  }
}