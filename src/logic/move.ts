import Description from './description';
import Version from './version';

/**
 * Movimiento de un pokémon.
 */
export default class Move {
  private readonly descriptions: Array<Description>;

  constructor(accuracy: number, descriptions: Array<Description>) {
    this.descriptions = descriptions;
  }

  public getDescription(lang: string, version: Version) {
    let d: Description;
    for (let i = 0; i < this.descriptions.length; i++) {
      d = this.descriptions[i];
      if (d.lang === lang && d.version === version) {
        return d;
      }
    }
  }
}