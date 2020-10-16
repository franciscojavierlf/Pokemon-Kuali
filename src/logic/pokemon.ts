import { Dictionary } from 'vue-router/types/router';
import Stats from './stats';
import Type from './type';
import Description from './description';

/**
 * Una clase que ayuda a gestionar un pokémon.
 */
export default class Pokemon {

  public readonly id: number;

  public readonly height: number;

  public readonly weight: number;

  public readonly baseExperience: number;

  public readonly stats: Stats;

  public readonly spriteUrl: string;

  private readonly names: Dictionary<string>;

  private readonly moves: Dictionary<Dictionary<string>>;

  private readonly types: Array<string>;

  private readonly genera: Dictionary<string>;

  private readonly descriptions: Dictionary<Dictionary<string>>;

  /**
   * Crea un pokémon con todas sus características.
   * @param id El id del pokémon.
   * @param names Los nombres en diferentes idiomas.
   * @param height La altura.
   * @param weight El peso.
   * @param baseExperience La experiencia base.
   * @param moves Los movimientos en diferentes idiomas y versiones de juego.
   * @param stats Los stats.
   * @param types El o los tipos del pokémon.
   * @param genera Los genera en diferentes idiomas.
   * @param descriptions Las descripciones en diferentes idiomas y versiones de juego.
   * @param spriteUrl La url para cargar el sprite.
   */
  constructor(id: number, names: Dictionary<string>, height: number, weight: number, baseExperience: number, moves: Array<Move>, stats: Stats, types: Array<Type>, genera: Dictionary<string>, descriptions: Array<Description>, spriteUrl: string) {
    this.id = id;
    this.names = names;
    this.height = height;
    this.weight = weight;
    this.baseExperience = baseExperience;
    this.moves = moves;
    this.stats = stats;
    this.types = types;
    this.genera = genera;
    this.descriptions = descriptions;
    this.spriteUrl = spriteUrl;
  }

  public getName(lang: string) {
    return this.names[lang];
  }

  public getMoves(lang: string, version: string) {
    return this.moves[lang][version];
  }

  public getGenera(lang: string) {
    return this.genera[lang];
  }
}