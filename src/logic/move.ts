import Description from './description';
import Type from './type';

/**
 * Movimiento de un pokémon.
 */
export default class Move {
  public readonly id: string;

  public readonly names: Dictionary<string>;

  public readonly power: number;

  public readonly pp: number;

  public readonly accuracy: number;

  public readonly type: Type;

  public readonly description: Dictionary<Description>;

  public versionGroup = '';

  public atLevel = -1;

  constructor(id: string, names: Dictionary<string>, power: number, pp: number, accuracy: number,
    type: Type, description: Dictionary<Description>) {
    this.id = id;
    this.names = names;
    this.power = power;
    this.pp = pp;
    this.accuracy = accuracy;
    this.type = type;
    this.description = description;
  }
}

type Dictionary<T> = { [id: string]: T };
