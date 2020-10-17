import Vue from 'vue';
import Vuex from 'vuex';
import PokemonBlob from '@/api/pokemonBlob';
import Type from '@/logic/type';
import Version from '@/logic/version';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: undefined,
    types: undefined,
    versions: undefined,
  },
  mutations: {
    setPokemon(state: any, pokemon: Array<PokemonRef> | undefined) {
      state.pokemon = pokemon;
    },
    setTypes(state: any, types: Array<Type> | undefined) {
      state.types = types;
    },
    setVersions(state: any, versions: Array<Version> | undefined) {
      state.versions = versions;
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
    /**
     * Hace el fetch de los tipos de pokémon.
     */
    async fetchTypes({ commit }: any) {
      // Hace el fetch únicamente si no hay datos
      if (this.state.types != null) {
        return;
      }
      // Carga los tipos
      const blob = new PokemonBlob();
      try {
        const t = await blob.getAllTypes();
        commit('setTypes', t);
      } catch (ex) {
        console.error(ex);
      }
    },
    /**
     * Hace el fetch de las versiones de juegos.
     */
    async fetchVersions({ commit }: any) {
      // Hace el fetch únicamente si no hay datos
      if (this.state.versions != null) {
        return;
      }
      // Carga las versiones
      const blob = new PokemonBlob();
      try {
        const v = await blob.getAllVersions();
        commit('setVersions', v);
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  modules: {
  },
});

type PokemonRef = { name: string; url: string };
