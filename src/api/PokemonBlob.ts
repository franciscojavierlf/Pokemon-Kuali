import axios from 'axios';
import PokemonReference from '@/logic/pokemonReference';
import Pokemon from '@/logic/pokemon';
import Utils from '@/utils/utils';

/**
 * Un blob para poder acceder a la API de https://pokeapi.co/.
 */
export default class PokemonBlob {
  private readonly root = 'https://pokeapi.co/api/v2';

  /**
   * Regresa una lista de todos los pokemon.
   */
  public async getAllPokemon(): Promise<Array<PokemonReference> | undefined> {
    try {
      const response = await axios.get(`${this.root}/pokemon?offset=0&limit=10000`);
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
        const id = Number(url[url.length - 1]);
        // Luego cambia el nombre de formato kebab a normal
        const name = Utils.kebabToNormal(res[i].name, true);
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
      const response = await axios.get(`${this.root}/pokemon/${id}`);
      // Esperamos que la api nos regrese lo de siempre y que el id sea válido
      if (response.data === undefined || response.data.results === undefined) {
        throw new Error('Error en la API.');
      }
      // Todo OK
      return response.data.results;
    } catch (ex) {
      console.error(ex);
    }
    return undefined;
  }
}
