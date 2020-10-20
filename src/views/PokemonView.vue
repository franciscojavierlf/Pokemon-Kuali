<template>
  <div class="container">
    <b-button @click="previous">{{ t['previous'][lang] }}</b-button>
    <b-button @click="next">{{ t['next'][lang] }}</b-button>
    <!-- El nombre -->
    <b-overlay :show="loading">
      <div v-if="loading" style="height: 100%"></div>
      <div v-else>
        <h1>{{ pokemon.names[lang] }}</h1>
        <h2>#{{ nicePokemonNumber() }}</h2>
        <b-img :src="pokemon.spriteUrl"/>
        {{ pokemon.genera[lang] }}
        <!-- Selección de la versión del juego -->
        <b-select v-model="versionId" :options="versionsSelect" />
        {{ pokemon.description[versionId].text[lang] }}
        <h3>{{ t['height'][lang] }}</h3>
        {{ pokemon.height }}
        <h3>{{ t['weight'][lang] }}</h3>
        {{ pokemon.weight }}
        <h3>{{ t['baseXp'][lang] }}</h3>
        {{ pokemon.baseExperience }}
        <h2>{{ t['types'][lang] }}</h2>
        <ul class="type-display">
          <li v-for="type of pokemon.types" :key="type.id" :class="[type.id]">
            {{ type.names[lang] }}
          </li>
        </ul>
        <h2>Stats</h2>
        <ul class="stats-display">
          <li v-for="stat of pokemon.stats" :key="stat.id">
            {{ stat.name }}: {{ stat.value }}
            <b-progress :value="stat.value"></b-progress>
          </li>
        </ul>
        <!-- Los movimientos -->
        <div class="accordion" role="tablist">
          <b-card v-for="move of pokemon.moves" :key="move.id" no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle="move.id" variant="info">{{ move.names[lang] }}</b-button>
            </b-card-header>
            <b-collapse :id="move.id" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </b-overlay>
    {{ pokemon.moves.length}}
  </div>
</template>

<script lang="ts">
import PokemonBlob from '@/api/pokemonBlob';
import Translations from '@/lang/translations';
import Pokemon from '@/logic/pokemon';
import Version from '@/logic/version';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class PokemonView extends Vue {
  private loading = true;

  private versionId = '';

  private versions: Dictionary<Version> = {};

  private t = Translations;

  private pokemon: Pokemon = Pokemon.createEmpty();

  constructor() {
    super();
    this.loadData();
  }

  @Watch('$route.params')
  private onParamsChange() {
    this.loadData();
  }

  get lang() {
    return this.$store.state.language;
  }

  /**
   * Obtiene las versiones en las que está el pokémon.
   */
  get versionsSelect() {
    const res: Array<Dictionary<any>> = [];
    Object.values(this.versions).forEach((v) => {
      if (this.pokemon.isInVersion(v, this.lang)) {
        res.push({ value: v.id, text: v.getName(this.lang) });
      }
    });
    // Selecciona el primer dato
    if (res.length > 0) {
      this.versionId = res[0].value;
    }
    return res;
  }

  private async loadData() {
    // Hace el fetch de los tipos de pokémon, y versiones del juego
    this.loading = true;
    const blob = new PokemonBlob();
    this.pokemon = (await blob.getPokemon(Number(this.$route.params.id)))
      || Pokemon.createEmpty();
    this.versions = await blob.getAllVersions() ?? {};
    this.loading = false;
  }

  private previous() {
    this.$router.push({ name: 'Pokemon', params: { id: String(this.pokemon.previousId()) } });
  }

  private next() {
    this.$router.push({ name: 'Pokemon', params: { id: String(this.pokemon.nextId()) } });
  }

  private nicePokemonNumber(): string {
    if (this.pokemon.id < 10) {
      return `00${this.pokemon.id}`;
    }
    if (this.pokemon.id < 100) {
      return `0${this.pokemon.id}`;
    }
    return String(this.pokemon.id);
  }
}

type Dictionary<T> = { [id: string]: T };
</script>

<style lang="scss" scoped>
.container {
  .type-display {
    .grass {
      background-color: green;
    }
  }

  .stats-display {
  }
}
</style>
