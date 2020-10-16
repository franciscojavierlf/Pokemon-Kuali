import { Dictionary } from 'vue-router/types/router';


export abstract class Version {
  private readonly names: Dictionary<string>;

  protected constructor(names: Dictionary<string>) {
    this.names = names;
  }

  /**
   * Obtiene el nombre de la versión de juego en cierto idioma.
   * @param lang
   */
  public getName(lang: string) {
    return this.names[lang];
  }
}

export class Gold extends Version {
  public static readonly Instance = new Gold();

  private constructor() {
    super({
      en: 'gold',
      es: 'oro',
    });
  }
}