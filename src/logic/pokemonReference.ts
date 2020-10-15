/**
 * Una referencia a un pokémon.
 */
export default class PokemonReference {
  public readonly name: string;

  public readonly id: number;

  /**
   * Construye una referencia con su id y nombre.
   * @param name
   * @param url
   */
  constructor(id: number, name: string) {
    this.name = name;
    this.id = id;
  }
}
