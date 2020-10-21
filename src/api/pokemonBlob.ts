import axios from 'axios';
import PokemonReference from '@/logic/pokemonReference';
import Pokemon from '@/logic/pokemon';
import Description from '@/logic/description';
import Version from '@/logic/version';
import Stat from '@/logic/stats';
import Move from '@/logic/move';
import Type from '@/logic/type';

/**
 * Un blob para poder acceder a la API de https://pokeapi.co/.
 */
export default class PokemonBlob {
  private static typesCache: Dictionary<Type> | undefined;

  private static versionsCache: Dictionary<Version> | undefined;

  private static statsCache: Dictionary<Stat> | undefined;

  private static movesCache: Dictionary<Move> | undefined;

  private readonly root = 'https://pokeapi.co/api/v2';

  private readonly pokemon = 'pokemon';

  private readonly types = 'type';

  private readonly species = 'pokemon-species';

  private readonly versions = 'version';

  private readonly stats = 'stat';

  private readonly moves = 'move';

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
        const { name } = res[i];
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
  public async getAllTypes(): Promise<Dictionary<Type>> {
    if (PokemonBlob.typesCache !== undefined) {
      return PokemonBlob.typesCache;
    }
    try {
      const response = await axios.get(`${this.root}/${this.types}?offset=0&limit=30`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los tipos
      const types: Dictionary<Type> = {};
      const res = response.data.results;
      const promises = [];
      for (let i = 0; i < res.length; i += 1) {
        types[res[i].name] = new Type(res[i].name, {});
        promises.push(axios.get(res[i].url));
      }
      // Resuelve los requests
      const resolved = await Promise.all(promises);
      for (let i = 0; i < resolved.length; i += 1) {
        // Agrega los datos a el tipo previamente instanciado
        const d = resolved[i].data;
        const t = types[d.name];
        // Nombres en diferentes idioma
        for (let j = 0; j < d.names.length; j += 1) {
          types[res[i].name].names[d.names[j].language.name] = d.names[j].name;
        }
        // Relaciona los bonus con otros tipos
        const r = (arr: Array<any>): Array<Type> => {
          const aux: Array<Type> = [];
          for (let j = 0; j < arr.length; j += 1) {
            aux.push(types[arr[j].name]);
          }
          return aux;
        };
        t.doubleDamageFrom = r(d.damage_relations.double_damage_from);
        t.doubleDamageTo = r(d.damage_relations.double_damage_to);
        t.halfDamageFrom = r(d.damage_relations.half_damage_from);
        t.halfDamageTo = r(d.damage_relations.half_damage_to);
        t.noDamageFrom = r(d.damage_relations.no_damage_from);
        t.noDamageTo = r(d.damage_relations.no_damage_to);
      }
      // Regresa
      PokemonBlob.typesCache = types;
      return types;
    } catch (ex) {
      console.error(ex);
    }
    return {};
  }

  /**
   * Obtiene todas las versiones de juego.
   */
  public async getAllVersions(): Promise<Dictionary<Version>> {
    if (PokemonBlob.versionsCache !== undefined) {
      return PokemonBlob.versionsCache;
    }
    try {
      const response = await axios.get(`${this.root}/${this.versions}?offset=0&limit=50`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los tipos
      const versions: Dictionary<Version> = {};
      const res = response.data.results;
      // Crea los promises para obtener la info
      const promises = [];
      for (let i = 0; i < res.length; i += 1) {
        promises.push(axios.get(res[i].url));
      }
      // Carga los datos
      const resolved = await Promise.all(promises);
      for (let i = 0; i < resolved.length; i += 1) {
        // Agrega los datos
        const v = resolved[i].data;
        versions[v.name] = new Version(v.name, {});
        for (let j = 0; j < v.names.length; j += 1) {
          versions[v.name].names[v.names[j].language.name] = v.names[j].name;
        }
      }
      PokemonBlob.versionsCache = versions;
      return versions;
    } catch (ex) {
      console.error(ex);
    }
    return {};
  }

  /**
   * Obtiene los stats.
   */
  public async getAllStats(): Promise<Dictionary<Stat>> {
    if (PokemonBlob.statsCache !== undefined) {
      return PokemonBlob.statsCache;
    }
    try {
      // Obtiene los stats en el idioma seleccionado
      const response = await axios.get(`${this.root}/${this.stats}?offset=0&limit=10`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los tipos
      const stats: Dictionary<Stat> = {};
      const res = response.data.results;
      const promises = [];
      for (let i = 0; i < res.length; i += 1) {
        promises.push(axios.get(res[i].url));
      }
      // Carga los resultados
      const resolved = await Promise.all(promises);
      for (let i = 0; i < res.length; i += 1) {
        // Agrega los datos
        const s = resolved[i].data;
        const names: Dictionary<string> = {};
        for (let j = 0; j < s.names.length; j += 1) {
          names[s.names[j].language.name] = s.names[j].name;
        }
        stats[s.name] = new Stat(s.name, names);
      }
      // Guarda el valor
      PokemonBlob.statsCache = stats;
      return stats;
    } catch (ex) {
      console.error(ex);
    }
    return {};
  }

  /**
   * Obtiene todos los movimientos posibles.
   * @param flavorTextEntries
   * @param versions
   */
  private async getAllMoves(): Promise<Dictionary<Move>> {
    if (PokemonBlob.movesCache !== undefined) {
      return PokemonBlob.movesCache;
    }
    try {
      const response = await axios.get(`${this.root}/${this.moves}?offset=0&limit=1000`);
      // Esperamos que la api nos regrese lo de siempre
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK, entonces construye los movimientos
      const moves: Dictionary<Move> = {};
      const res = response.data.results;
      // Crea los promises para obtener la info
      const promises = [];
      for (let i = 0; i < res.length; i += 1) {
        promises.push(axios.get(res[i].url));
      }
      // Carga los datos
      const resolved = await Promise.all(promises);
      const types = await this.getAllTypes();
      const versions = await this.getAllVersions();
      for (let i = 0; i < resolved.length; i += 1) {
        // Agrega los datos
        const m = resolved[i].data;
        const desc = PokemonBlob.getDescriptions(m.flavor_text_entries, versions);
        const names: Dictionary<string> = {};
        for (let j = 0; j < m.names.length; j += 1) {
          names[m.names[j].language.name] = m.names[j].name;
        }
        moves[m.name] = new Move(m.name, names, m.power,
          m.pp, m.accuracy, types[m.type.name], desc);
      }
      PokemonBlob.movesCache = moves;
      return moves;
    } catch (ex) {
      console.error(ex);
    }
    return {};
  }

  /**
   * Obtiene toda la información de un pokémon.
   * @param id El número de pokémon global.
   * @param types Los tipos globales.
   * @param versions Las versiones globales.
   */
  public async getPokemon(id: number): Promise<Pokemon | undefined> {
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
      // Primero extraemos toda la información general
      const pokemonData = pokemonRes.data;
      const { height, weight } = pokemonData;
      const baseExperience = pokemonData.base_experience;
      const spriteUrl = pokemonData.sprites.front_default;
      const stats = await this.getStats(pokemonData);
      // Crea los tipos
      const allTypes: Dictionary<Type> = await this.getAllTypes();
      const types: Dictionary<Type> = {};
      // Luego asigna solos los indicados
      for (let i = 0; i < pokemonData.types.length; i += 1) {
        const { name } = pokemonData.types[i].type;
        types[name] = allTypes[name];
      }
      const versions = await this.getAllVersions();
      // Extrae los movimientos
      // const moves = await this.getMoves(pokemonData);
      const moves = {}; // Vacío porque tarda mucho
      // Luego toda la info del tipo
      const speciesData = speciesRes.data;
      const genera: Dictionary<string> = {}; // Genera
      Object.keys(speciesData.genera).forEach((key) => {
        const g = speciesData.genera[key];
        genera[g.language.name] = g.genus;
      });
      // Obtiene los nombres
      const names: Dictionary<string> = {};
      for (let i = 0; i < speciesData.names.length; i += 1) {
        names[speciesData.names[i].language.name] = speciesData.names[i].name;
      }
      const descriptions = await PokemonBlob
        .getDescriptions(speciesData.flavor_text_entries, versions);
      // Regresamos el resultado final
      return new Pokemon(id, names, height, weight, baseExperience,
        genera, descriptions, moves, stats, types, spriteUrl);
    } catch (ex) {
      console.error(ex);
    }
    return undefined;
  }

  /**
   * Obtiene los movimientos de un pokémon.
   * @param pokemonData
   */
  private async getMoves(pokemonData: Dictionary<any>): Promise<Dictionary<Move>> {
    const moves = await this.getAllMoves();
    const pokeMoves: Dictionary<Move> = {};
    for (let i = 0; i < pokemonData.moves.length; i += 1) {
      const { name } = pokemonData.moves[i].move;
      pokeMoves[name] = moves[name];
    }
    return pokeMoves;
  }

  /**
   * Obtiene los stats de un pokémon.
   */
  private async getStats(pokemonData: Dictionary<any>): Promise<Dictionary<Stat>> {
    const stats = await this.getAllStats();
    const pokeStats: Dictionary<Stat> = {};
    for (let i = 0; i < pokemonData.stats.length; i += 1) {
      const base = pokemonData.stats[i].base_stat;
      if (base >= 0) {
        const { name } = pokemonData.stats[i].stat;
        pokeStats[name] = stats[name];
        pokeStats[name].value = base;
      }
    }
    return pokeStats;
  }

  /**
   * Obtiene las descripciones de un pokémon.
   * @param flavorTextEntries
   * @param versions
   */
  private static getDescriptions(
    flavorTextEntries: Array<any>,
    versions: Dictionary<Version>,
  ): Dictionary<Description> {
    const res: Dictionary<Description> = {};
    for (let i = 0; i < flavorTextEntries.length; i += 1) {
      const f = flavorTextEntries[i];
      // Una versión normal
      if (f.version !== undefined) {
        if (res[f.version.name] === undefined) {
          res[f.version.name] = new Description(versions[f.version.name], {});
        }
        res[f.version.name].text[f.language.name] = f.flavor_text;
      // Cuando hay varios juegos en un grupo
      } else if (f.version_group !== undefined) {
        const groups = f.version_group.name.split('-');
        for (let j = 0; j < groups.length; j += 1) {
          if (res[groups[j]] === undefined) {
            res[groups[j]] = new Description(versions[groups[j]], {});
          }
          res[groups[j]].text[f.language.name] = f.flavor_text;
        }
      }
    }
    return res;
  }
}

type Dictionary<T> = { [id: string]: T };
