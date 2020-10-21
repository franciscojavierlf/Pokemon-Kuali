<template>
  <b-overlay :show="pokemon.length === 0">
    <div class="home">
    <!-- Muestra la lista de nombres de los pokémon. -->
      <b-pagination
        id="pagination"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        aria-controls="pokemon-table"
      />
      <div id="table-container">
        <b-table
          id="pokemon-table"
          striped
          hover
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          @row-clicked="rowClicked"
        />
      </div>
    </div>
  </b-overlay>
</template>

<script lang="ts">
import Translations from '@/lang/translations';
import Pokemon from '@/logic/pokemon';
import PokemonReference from '@/logic/pokemonReference';
import Utils from '@/utils/utils';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private t = Translations;

  private currentPage = 1;

  private perPage = 50;

  private pokemon: Array<PokemonReference> = [];

  /**
   * Los campos de la tabla
   */
  private fields = [
    { key: 'id', label: 'Number', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
  ];

  created() {
    // Cargamos los pokemones con un dispatch de la tienda
    this.$store.dispatch('fetchPokemon')
      .then(() => { this.pokemon = this.$store.state.pokemon; });
  }

  get lang() {
    return this.$store.state.language;
  }

  private get items() {
    const res = [];
    for (let i = 0; i < this.pokemon.length; i += 1) {
      const p = this.pokemon[i];
      if (p.id > 0 && p.id <= Pokemon.LastId) {
        res.push({ id: p.id, name: Utils.kebabToNormal(p.name, true) });
      }
    }
    return res;
  }

  private get rows() {
    return this.pokemon.length;
  }

  /**
   * Carga en una nueva página la información del pokémon.
   */
  private rowClicked({ id }: { id: number }) {
    this.$router.push({ name: 'Pokemon', params: { id: String(id) } });
  }
}
</script>

<style lang="scss">
.home {
  background-color: lightgray;
  padding-top: 15px;

  h1 {
    font-size: 3em;
    display: inline-block;
  }

  #pagination {
    color: black !important;
  }

  #table-container {
    height: calc(100vh - 150px);
    overflow: auto;

    #pokemon-table {
      background-color: white;
      margin: 0px;
      td {
        padding: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
