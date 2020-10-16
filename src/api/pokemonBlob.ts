import axios from 'axios';
import PokemonReference from '@/logic/pokemonReference';
import Pokemon from '@/logic/pokemon';
import { Dictionary } from 'vue-router/types/router';
import Stats from '@/logic/stats';
import * as Types from '@/logic/type';

/**
 * Un blob para poder acceder a la API de https://pokeapi.co/.
 */
export default class PokemonBlob {
  private readonly root = 'https://pokeapi.co/api/v2';

  private readonly pokemon = 'pokemon';

  private readonly species = 'pokemon-species';

  private readonly versions = 'version';

  private readonly evolution = 'evolution-chain';

  /**
   * Regresa una lista de todos los pokemon.
   */
  public async getAllPokemon(): Promise<Array<PokemonReference> | undefined> {
    try {
      const response = await axios.get(`${this.root}/${this.pokemon}?offset=0&limit=10000`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los pokémon
      const pokemon = [];
      const res = response.data.results;
      for (let i = 0; i < res.length; i += 1) {
        // Saca el id de la url
        const url = res[i].url.split('/');
        // Esperamos pokemon/id/, entonces el último es vacío
        const id = Number(url[url.length - 2]);
        // Luego cambia el nombre de formato kebab a normal
        const name = res[i].name;
        pokemon.push(new PokemonReference(id, name));
      }
      // Regresa la lista de pokémon
      return pokemon;
    } catch (ex) {
      console.error(ex);
    }
    return undefined;
  }

  /**
   * Obtiene toda la información de un pokémon.
   * @param id El número de pokémon global.
   */
  public async getPokemon(id: number): Promise<Pokemon | undefined> {
    try {
      // Consigue todos los datos de forma asyncrona para ahorrar tiempo
      const [pokemonRes, speciesRes] = await Promise.all([
        axios.get(`${this.root}/${this.pokemon}/${id}`),
        axios.get(`${this.root}/${this.species}/${id}`),
      ]);      
      // Esperamos que la api nos regrese lo de siempre y que el id sea válido
      if (pokemonRes.data === undefined ||
          speciesRes.data === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces crea el pokémon
      return PokemonBlob.fromAPI(pokemonRes.data, speciesRes.data);
    } catch (ex) {
      console.error(ex);
    }
    return undefined;
  }

  /**
   * Crea un pokémon con los datos obtenidos de la API.
   * @param pokemonData La información general del pokémon.
   * @param speciesData Información acerca del tipo de pokémon.
   * @param evolutionData Las evoluciones del pokémon.
   */
  private static fromAPI(pokemonData: Dictionary<any>, speciesData: Dictionary<any>): Pokemon {
    // Primero extraemos toda la información general
    const id = pokemonData.id;
    const height = pokemonData.height;
    const weight = pokemonData.weight;
    const baseExperience = pokemonData.base_experience;
    const spriteUrl = pokemonData.sprites.front_default;
    const moves: Array<string> = []; // Nombre de movimientos
    Object.keys(pokemonData.moves).forEach((key) => moves.push(pokemonData.moves[key].move.name));
    const sd: Dictionary<number> = {}; // Stats
    Object.keys(pokemonData.stats).forEach((key) => {
      const s = pokemonData.stats[key];
      sd[s.stat.name] = Number(s.base_stat);
    });
    const stats = new Stats(sd['hp'], sd['attack'], sd['defense'], sd['special-attack'], sd['special-defense'], sd['speed']);
    const types: Array<Types.Type> = []; // Tipos
    Object.keys(pokemonData.types).forEach((key) => types.push(this.fromName(pokemonData.types[key].type.name)));
    // Luego toda la info del tipo
    const genera: Dictionary<string> = {}; // Genera
    Object.keys(speciesData.genera).forEach((key) => {
      const g = speciesData.genera[key];
      genera[g.language.name] = g.genus;
    });
    const names: Dictionary<string> = {}; // Nombres en diferentes idiomas
    Object.keys(speciesData.names).forEach((key) => {
      const n = speciesData.names[key];
      names[n.language.name] = n.name;
    });
    const descriptions: Dictionary<string> = {}; // Descripciones en diferentes idiomas
    Object.keys(speciesData.flavor_text_entries).forEach((key) => {
      // Como hay muchas descripciones por juego,
      //  por ahora se queda con la última versión
      const t = speciesData.flavor_text_entries[key];
      descriptions[t.language.name] = t.flavor_text;
    });

    // Regresamos el resultado final
    return new Pokemon(id, names, height, weight, baseExperience, moves, stats, types, genera, descriptions, spriteUrl);
  }

  /**
   * Obtiene un tipo dependiendo del nombre.
   * @param name
   */
  public static fromName(name: string): Types.Type {
    // Nombres específicos de pokeapi
    // Esto lo hacemos para poder mudar de api si es necesario
    switch (name) {
      case 'bug': return Types.Bug.Instance;
      case 'electric': return Types.Electric.Instance;
      case 'fire': return Types.Fire.Instance;
      case 'grass': return Types.Grass.Instance;
      case 'normal': return Types.Normal.Instance;
      case 'rock': return Types.Rock.Instance;
      case 'dark': return Types.Dark.Instance;
      case 'fairy': return Types.Fairy.Instance;
      case 'flying': return Types.Flying.Instance;
      case 'ground': return Types.Ground.Instance;
      case 'posion': return Types.Poison.Instance;
      case 'steel': return Types.Steel.Instance;
      case 'dragon': return Types.Dragon.Instance;
      case 'fighting': return Types.Fighting.Instance;
      case 'ghost': return Types.Ghost.Instance;
      case 'ice': return Types.Ice.Instance;
      case 'psychic': return Types.Psychic.Instance;
      case 'water': return Types.Water.Instance;
      default: throw new Error(`Type '${name}' not recognized.`);
    }
  }
}
