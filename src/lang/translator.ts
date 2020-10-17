/**
 * Un diccionario para varios idiomas.
 */
export default class Translator {

  // Las traducciones
  private static readonly translations = {
    'en': {
      
    }
  }

  private lang: string;

  private constructor(lang: string) {
    this.lang = lang;
  }

  public get() {

  }
}