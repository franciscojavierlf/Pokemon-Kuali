<template>
  <div class="home">
    <img src="@/assets/pokeball.png" />
    <h1>Pokémon Companion</h1>
    <!-- Muestra la lista de nombres de los pokémon. -->
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
      :items="pokemonItems"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
  </div>
</template>

<script lang="ts">
import PokemonReference from '@/logic/pokemonReference';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private currentPage = 1;

  private perPage = 50;

  private pokemon: Array<PokemonReference> = [];

  async created() {
    // Cargamos los pokemones con un dispatch de la tienda
    this.$store.dispatch('fetchPokemon')
      .then(() => { this.pokemon = this.$store.state.pokemon; });
  }

  get pokemonItems() {
    const res = [];
    for (let i = 0; i < this.pokemon.length; i += 1) {
      res.push({ id: this.pokemon[i].id, name: this.pokemon[i].name });
    }
    return res;
  }

  get rows() {
    return this.pokemon.length;
  }
}
</script>

<style lang="scss" scoped>
.home {
  img {
    width: 100px;
    display: inline-block;
  }

  h1 {
    font-size: 3em;
    display: inline-block;
  }
}
</style>
