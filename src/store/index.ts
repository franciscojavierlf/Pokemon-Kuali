import Vue from 'vue';
import Vuex from 'vuex';
import PokemonBlob from '@/api/pokemonBlob';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: null,
  },
  mutations: {
    setPokemon(state: any, pokemon: Array<PokemonRef> | null) {
      state.pokemon = pokemon;
    },
  },
  actions: {
    async fetchPokemon({ commit }: any) {
      // Hace el dispatch únicamente si no hay datos
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
