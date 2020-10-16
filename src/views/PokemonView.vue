<template>
  <div class="container">
    pokemon
  </div>
</template>

<script lang="ts">

import PokemonBlob from '@/api/PokemonBlob';
import Pokemon from '@/logic/pokemon';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PokemonView extends Vue {
  private pokemon: Pokemon | undefined;

  created() {
    // Carga el pokémon con el id de parámetros
    // Sabemos que existe un id porque router ya nos
    // protege de no tenerlo
    const blob = new PokemonBlob();
    blob.getPokemon(Number(this.$route.params.id))
      .then((p) => { this.pokemon = p; });
  }
}
</script>

<style lang="scss">
</style>
