<template>
  <div class="container">
    <ul class="type-display">
      <h2>{{ t.get('types') }}</h2>
      <li v-for="type of pokemon.getTypes()" :key="type.id" :class="[type.id]">
        {{ type.getName(store.state.lang) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { API } from '@/api/api';
import PokemonBlob from "@/api/pokemonBlob";
import Pokemon from "@/logic/pokemon";
import Type from '@/logic/type';
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PokemonView extends Vue {
  private t

  private pokemon: Pokemon = Pokemon.createEmpty();

  created() {
    // Hace el fetch de los tipos de pokémon, y versiones del juego
    Promise.all([
      this.$store.dispatch("fetchTypes"),
      this.$store.dispatch("fetchVersions"),
    ]).then(async () => {
      const blob = new PokemonBlob();
      this.pokemon = await blob.getPokemon(
        Number(this.$route.params.id),
        this.$store.state.types,
        this.$store.state.versions
      ) ?? Pokemon.createEmpty();
    });
  }
}
</script>

<style lang="scss">
.container {
  .type-display {
    .grass {
      background-color: green;
    }
  }
}
</style>
