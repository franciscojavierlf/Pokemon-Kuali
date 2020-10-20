import Version from './version';

/**
 * La descripción de un pokémon.
 */
export default class Description {
  public readonly version: Version;

  public readonly text: Dictionary<string>;

  constructor(version: Version, text: Dictionary<string>) {
    this.version = version;
    this.text = text;
  }
}

type Dictionary<T> = { [id: string]: T };
