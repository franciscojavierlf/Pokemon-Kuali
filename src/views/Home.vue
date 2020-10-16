<template>
  <div class="home">
    <img src="@/assets/pokeball.png" />
    <h1>Pokémon Companion</h1>
    <!-- Muestra la lista de nombres de los pokémon. -->
    <b-overlay :show="pokemon.length === 0">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        aria-controls="pokemon-table"
      />
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
    </b-overlay>
  </div>
</template>

<script lang="ts">
import PokemonReference from '@/logic/pokemonReference';
import Utils from '@/utils/utils';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
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

  async created() {
    // Cargamos los pokemones con un dispatch de la tienda
    this.$store.dispatch('fetchPokemon')
      .then(() => { this.pokemon = this.$store.state.pokemon; });
  }

  private get items() {
    const res = [];
    for (let i = 0; i < this.pokemon.length; i += 1) {
      res.push({ id: this.pokemon[i].id, name: Utils.kebabToNormal(this.pokemon[i].name, true) });
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
  img {
    width: 100px;
    display: inline-block;
  }

  h1 {
    font-size: 3em;
    display: inline-block;
  }

  #pokemon-table {
    td {
      padding: 5px;
      cursor: pointer;
    }
  }
}
</style>
