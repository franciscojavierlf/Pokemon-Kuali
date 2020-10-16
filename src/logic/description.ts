
/**
 * La descripción de un pokémon.
 */
export default class Description {
  public readonly lang: string;
  
  public readonly version: Version;

  public readonly text: string;

  constructor(lang: string, version: Version, text: string) {
    this.lang = lang;
    this.version = version;
    this.text = text;
  }
}