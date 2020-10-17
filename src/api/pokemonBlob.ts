import axios from 'axios';
import PokemonReference from '@/logic/pokemonReference';
import Pokemon from '@/logic/pokemon';
import { Dictionary } from 'vue-router/types/router';
import Type, * as Types from '@/logic/type';
import Description from '@/logic/description';
import Version from '@/logic/version';
import Stat from '@/logic/stats';

/**
 * Un blob para poder acceder a la API de https://pokeapi.co/.
 */
export default class PokemonBlob {
  private readonly root = 'https://pokeapi.co/api/v2';

  private readonly pokemon = 'pokemon';

  private readonly types = 'type';

  private readonly species = 'pokemon-species';

  private readonly versions = 'version';

  private readonly stats = 'stats';

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
   * Obtiene todos los tipos de pokémon.
   */
  public async getAllTypes(): Promise<Dictionary<Type> | undefined> {
    try {
      const response = await axios.get(`${this.root}/${this.types}?offset=0&limit=30`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los tipos
      const types: Dictionary<Type> = {};
      const res = response.data.results;
      for (let i = 0; i < res.length; i += 1) {
        // Se guarda con el nombre para un acceso más sencillo
        types[res[i].name] = new Type(res[i].name);
      }
      let finished = 0;
      // Regresa un promise cuando todos fueron cargados para relacionarlos entre sí
      return new Promise((resolve) => {
        for (let i = 0; i < res.length; i += 1) {
          axios.get(res[i].url).then((typeRes) => {
            // Agrega los datos a el tipo previamente instanciado
            const d = typeRes.data;
            const t = types[d.name];
            // Crea nombres en diferentes idiomas
            const names: Dictionary<string> = {};
            for (let j = 0; j < d.names.length; j += 1) {
              names[d.names[j].language.name] = d.names[j].name;
            }
            t.setNames(names);
            // Relaciona los bonus con otros tipos
            const r = (arr: Array<any>): Array<Type> => {
              const res: Array<Type> = [];
              for (let j = 0; j < arr.length; j += 1) {
                res.push(types[arr[j].name]);
              }
              return res;
            };
            t.setDoubleDamageFrom(r(d.damage_relations.double_damage_from));
            t.setDoubleDamageTo(r(d.damage_relations.double_damage_to));
            t.setHalfDamageFrom(r(d.damage_relations.half_damage_from));
            t.setHalfDamageTo(r(d.damage_relations.half_damage_to));
            t.setNoDamageFrom(r(d.damage_relations.no_damage_from));
            t.setNoDamageTo(r(d.damage_relations.no_damage_to));
            // Checa si fue el último en actualizar
            finished++;
            if (finished === res.length) {
              resolve(types);
            }
          });
        }
      });
    } catch (ex) {
      console.error(ex);
    }
    return undefined;
  }

  /**
   * Obtiene todas las versiones de juego.
   */
  public async getAllVersions(): Promise<Dictionary<Version> | undefined> {
    try {
      const response = await axios.get(`${this.root}/${this.versions}?offset=0&limit=50`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los tipos
      const versions: Dictionary<Version> = {};
      const res = response.data.results;
      let finished = 0;
      // Regresa un promise cuando todos fueron cargados
      return new Promise((resolve) => {
        for (let i = 0; i < res.length; i += 1) {
          axios.get(res[i].url).then((vRes) => {
            // Agrega los datos
            const v = vRes.data;
            // Crea nombres en diferentes idiomas
            const names: Dictionary<string> = {};
            for (let j = 0; j < v.names.length; j += 1) {
              names[v.names[j].language.name] = v.names[j].name;
            }
            versions[v.name] = new Version(v.name, names);
            // Checa si fue el último en actualizar
            finished++;
            if (finished === res.length) {
              resolve(versions);
            }
          });
        }
      });
    } catch (ex) {
      console.error(ex);
    }
    return undefined;
  }

  /**
   * Obtiene el nombre de los stats.
   */
  public async getAllStats(): Promise<Dictionary<Stat> | undefined> {
    try {
      const response = await axios.get(`${this.root}/${this.stats}?offset=0&limit=10`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los tipos
      const stats: Dictionary<Stat> = {};
      const res = response.data.results;
      let finished = 0;
      // Regresa un promise cuando todos fueron cargados
      return new Promise((resolve) => {
        for (let i = 0; i < res.length; i += 1) {
          axios.get(res[i].url).then((sRes) => {
            // Agrega los datos
            const s = sRes.data;
            // Crea nombres en diferentes idiomas
            const names: Dictionary<string> = {};
            for (let j = 0; j < s.names.length; j += 1) {
              names[s.names[j].language.name] = s.names[j].name;
            }
            stats[s.name] = new Stat(s.name, names);
            // Checa si fue el último en actualizar
            finished++;
            if (finished === res.length) {
              resolve(stats);
            }
          });
        }
      });
    } catch (ex) {
      console.error(ex);
    }
    return undefined;
  }

  /**
   * Obtiene toda la información de un pokémon.
   * @param id El número de pokémon global.
   * @param types Los tipos globales.
   * @param versions Las versiones globales.
   */
  public async getPokemon(id: number, types: Array<Type>, versions: Array<Version>): Promise<Pokemon | undefined> {
    try {
      // Consigue todos los datos de forma asyncrona para ahorrar tiempo
      const [pokemonRes, speciesRes] = await Promise.all([
        axios.get(`${this.root}/${this.pokemon}/${id}`),
        axios.get(`${this.root}/${this.species}/${id}`),
      ]);
      // Esperamos que la api nos regrese lo de siempre y que el id sea válido
      if (pokemonRes.data === undefined || speciesRes.data === undefined) {
        throw new Error('Error en la API.');
      }
      // En un futuro carga los movimientos.
      const movesData = {};
      return createPokemon(pokemonData, speciesData, movesData, types, versions);
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
  private static async createPokemon(
    pokemonData: Dictionary<any>,
    speciesData: Dictionary<any>,
    movesData: Dictionary<any>,
    types: Array<Type>,
    versions: Array<Version>
  ): Pokemon {
    // Primero extraemos toda la información general
    const id = pokemonData.id;
    const height = pokemonData.height;
    const weight = pokemonData.weight;
    const baseExperience = pokemonData.base_experience;
    const spriteUrl = pokemonData.sprites.front_default;
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

    // Obtiene datos que requieren de nuevo acceso a la api
    const [] = await Promise.all([
      axios.get(`${this.}`)
    ]);

    // Regresamos el resultado final
    return new Pokemon(id, names, height, weight, baseExperience, moves, stats, types, genera, descriptions, spriteUrl);
  }
}
