import { Dictionary } from 'vue-router/types/router';

/**
 * Tipo de un pokémon.
 */

export abstract class Type {
  private readonly names: Dictionary<string>;

  /**
   * Solo puede instanciarse dentro de la clase.
   * @param names Los nombres en diferentes idiomas.
   */
  protected constructor(names: Dictionary<string>) {
    this.names = names
  }

  /**
   * Obtiene el nombre del tipo en un lenguaje en específico.
   * @param lang
   */
  public getName(lang: string) {
    return this.names[lang];
  }

  public abstract getWeakenesses(): Array<Type>;
}

export class Bug extends Type {
  public static readonly Instance = new Bug();

  private constructor() {
    super({
      en: 'bug',
      es: 'bicho',
    });
  }

  public getWeakenesses() {
    return [Normal.Instance];
  }
}

export class Electric extends Type {
  public static readonly Instance = new Electric();

  private constructor() {
    super({
      en: 'electric',
      es: 'eléctrico',
    });
  }

  public getWeakenesses() {
    return [Normal.Instance];
  }
}

export class Fire extends Type {
  public static readonly Instance = new Fire();

  private constructor() {
    super({
      en: 'fire',
      es: 'fuego',
    });
  }

  public getWeakenesses() {
    return [Normal.Instance];
  }
}

export class Grass extends Type {
  public static readonly Instance = new Grass();

  private constructor() {
    super({
      en: 'grass',
      es: 'pasto',
    });
  }

  public getWeakenesses() {
    return [Normal.Instance];
  }
}

export class Normal extends Type {
  public static readonly Instance = new Normal();

  private constructor() {
    super({
      en: 'normal',
      es: 'normal'
    });
  }

  public getWeakenesses() {
    return [Grass.Instance];
  }
}

export class Rock extends Type {
  public static readonly Instance = new Rock();

  private constructor() {
    super({
      en: 'rock',
      es: 'piedra',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Dark extends Type {
  public static readonly Instance = new Dark();

  private constructor() {
    super({
      en: 'dark',
      es: 'oscuro',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Fairy extends Type {
  public static readonly Instance = new Fairy();

  private constructor() {
    super({
      en: 'fairy',
      es: 'hada',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Flying extends Type {
  public static readonly Instance = new Flying();

  private constructor() {
    super({
      en: 'flying',
      es: 'vuelo',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Ground extends Type {
  public static readonly Instance = new Ground();

  private constructor() {
    super({
      en: 'ground',
      es: 'tierra',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Poison extends Type {
  public static readonly Instance = new Poison();

  private constructor() {
    super({
      en: 'poison',
      es: 'veneno',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Steel extends Type {
  public static readonly Instance = new Steel();

  private constructor() {
    super({
      en: 'steel',
      es: 'acero',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Dragon extends Type {
  public static readonly Instance = new Dragon();

  private constructor() {
    super({
      en: 'dragon',
      es: 'dragón',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Fighting extends Type {
  public static readonly Instance = new Fighting();

  private constructor() {
    super({
      en: 'fighting',
      es: 'pelea',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Ghost extends Type {
  public static readonly Instance = new Ghost();

  private constructor() {
    super({
      en: 'ghost',
      es: 'fantasma',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Ice extends Type {
  public static readonly Instance = new Ice();

  private constructor() {
    super({
      en: 'ice',
      es: 'hielo',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Psychic extends Type {
  public static readonly Instance = new Psychic();

  private constructor() {
    super({
      en: 'psychic',
      es: 'psíquico',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}

export class Water extends Type {
  public static readonly Instance = new Water();

  private constructor() {
    super({
      en: 'water',
      es: 'agua',
    });
  }

  public getWeakenesses() {
    return [Water.Instance];
  }
}
