import Move from './move';
import Type from './type';
import Stat from './stats';
import Description from './description';
import Version from './version';

/**
 * Una clase que ayuda a gestionar un pokémon.
 */
export default class Pokemon {
  public static LastId = 893;

  public readonly id: number;

  public readonly names: Dictionary<string>;

  public readonly height: number;

  public readonly weight: number;

  public readonly baseExperience: number;

  public readonly genera: Dictionary<string>;

  public readonly description: Dictionary<Description>;

  public readonly stats: Dictionary<Stat>;

  public readonly moves: Dictionary<Move>;

  public readonly types: Dictionary<Type>;

  public readonly spriteUrl: string;

  /**
   * Crea un pokémon con todas sus características.
   * @param id El id del pokémon.
   * @param names El nombre.
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
  constructor(
    id: number,
    names: Dictionary<string>,
    height: number,
    weight: number,
    baseExperience: number,
    genera: Dictionary<string>,
    description: Dictionary<Description>,
    moves: Dictionary<Move>,
    stats: Dictionary<Stat>,
    types: Dictionary<Type>,
    spriteUrl: string,
  ) {
    this.id = id;
    this.names = names;
    this.height = height;
    this.weight = weight;
    this.baseExperience = baseExperience;
    this.genera = genera;
    this.description = description;
    this.moves = moves;
    this.stats = stats;
    this.types = types;
    this.spriteUrl = spriteUrl;
  }

  public nextId() {
    return this.id >= Pokemon.LastId ? 1 : this.id + 1;
  }

  public previousId() {
    return this.id <= 1 ? Pokemon.LastId : this.id - 1;
  }

  public isInVersion(v: Version, lang: string): boolean {
    return this.description[v.id] !== undefined
      && this.description[v.id].text[lang] !== undefined;
  }

  public static createEmpty(): Pokemon {
    return new Pokemon(-1, {}, -1, -1, -1, {}, {}, {}, {}, {}, '');
  }
}

type Dictionary<T> = { [id: string]: T };
