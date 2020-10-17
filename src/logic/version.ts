import { Dictionary } from 'vue-router/types/router';

export default class Version {
  public readonly id: string;

  public readonly names: Dictionary<string>;

  constructor(id: string, names: Dictionary<string>) {
    this.id = id;
    this.names = names;
  }
}