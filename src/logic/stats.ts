/**
 * Generalización de las stats de un pokémon.
 */
export default class Stats {
  public readonly hp: number;

  public readonly attack: number;

  public readonly defense: number;

  public readonly specialAttack: number;

  public readonly specialDefense: number;

  public readonly speed: number;

  constructor(hp: number, attack: number, defense: number, specialAttack: number, specialDefense: number, speed: number) {
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
  }
}