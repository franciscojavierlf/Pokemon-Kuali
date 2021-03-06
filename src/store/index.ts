import Vue from 'vue';
import Vuex from 'vuex';
import PokemonBlob from '@/api/pokemonBlob';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: undefined,
    language: 'en',
  },
  mutations: {
    setPokemon(state: any, pokemon: Array<PokemonRef> | undefined) {
      state.pokemon = pokemon;
    },
    setLanguage(state: any, language: string) {
      state.language = language;
    },
  },
  actions: {
    /**
     * Hace el fetch de todos los pokémon.
     */
    async fetchPokemon({ commit }: any) {
      // Hace el fetch únicamente si no hay datos
      if (this.state.pokemon != null) {
        return;
      }
      // Carga los pokémon
      const blob = new PokemonBlob();
      try {
        const p = await blob.getAllPokemon();
        commit('setPokemon', p);
      } catch (ex) {
        console.error(ex);
      }
    },
  },
  modules: {
  },
});

type PokemonRef = { name: string; url: string };
