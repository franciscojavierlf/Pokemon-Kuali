import Utils from '@/utils/utils';

export default class Version {
  public readonly id: string;

  public readonly names: Dictionary<string>;

  constructor(id: string, names: Dictionary<string>) {
    this.id = id;
    this.names = names;
  }

  public getName(lang: string) {
    return this.names[lang] ?? Utils.kebabToNormal(this.id);
  }
}

type Dictionary<T> = { [id: string]: T };
