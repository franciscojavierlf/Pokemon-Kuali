<template>
  <b-overlay variant="transparent" blur="0" :show="loading">
    <div class="container">
    <!-- El nombre -->
      <b-container v-if="!loading">
        <b-row>
          <b-col style="text-align: left">
            <b-button
              class="move-btn"
              variant="success"
              @click="previous"
            >
              {{ t['previous'][lang] }}
            </b-button>
          </b-col>
          <b-col style="text-align: right;">
            <b-button
              class="move-btn"
              variant="success"
              @click="next"
            >
              {{ t['next'][lang] }}
            </b-button>
          </b-col>
        </b-row>
        <!-- La info -->
        <b-row style="margin-top: 25px;">
          <b-col cols="4">
            <b-img id="sprite" :src="pokemon.spriteUrl"/>
            <h1 id="name">{{ pokemon.names[lang] }}</h1>
            <h2 id="number">#{{ nicePokemonNumber() }}</h2>
            {{ pokemon.genera[lang] }}
          </b-col>
          <b-col>
            <table class="stats-display">
              <tr v-for="stat of pokemon.stats" :key="stat.id">
                <td>
                  {{ stat.names[lang] }}
                </td>
                <td>
                  <b-progress
                    height="2em"
                    :value="stat.value / 255 * 100"
                    show-progress
                  />
                </td>
              </tr>
            </table>
          </b-col>
        </b-row>
        <!-- Descripción y tipos -->
        <b-row>
          <b-col cols="4">
            <ul class="types-display">
              <li v-for="type of pokemon.types" :key="type.id" :class="[type.id]">
                {{ type.names[lang] }}
              </li>
            </ul>
          </b-col>
          <b-col>
            <b-select v-model="versionId" size="sm" :options="versionsSelect" />
            <p>{{ pokemon.description[versionId].text[lang] }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <table id="profile-table">
              <thead>
                <td>{{ t['height'][lang] }}</td>
                <td>{{ t['weight'][lang] }}</td>
                <td>{{ t['baseXp'][lang] }}</td>
              </thead>
              <tr>
                <td>{{ pokemon.height }}</td>
                <td>{{ pokemon.weight }}</td>
                <td>{{ pokemon.baseExperience }}</td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-overlay>
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
  max-width: 1000px;
  padding: 15px;
  padding-top: 0px;
  min-height: 500px;
  background-color: white;
  margin-top: 25px;
  border-radius: 10px;

  .move-btn {
    margin: 10px;
  }

  #name {
    margin-top: -25px;
  }

  #number {
    color: gray;
  }

  #sprite {
    width: 200px;
    margin-top: -30px;
    image-rendering: crisp-edges;
    /* Chromium + Safari */
    image-rendering: pixelated;

  }

  #profile-table {
    width: 100%;
    font-size: 18px;
    padding: 10px;
    margin-top: 10px;

    thead {
      font-weight: bold;
    }
    tr td {
      width: 33%;
    }
  }

  .stats-display {
    padding: 25px;
    margin: auto;
    max-width: 600px;

    tr td:first-child {
      width: 30%;
    }

    tr td {
      padding: 5px;
    }
  }

  .types-display {
    margin-left: -50px;
    padding: 0px;
    li {
      list-style-type: none;
      background-color: gray;
      margin: 0px 5px 0px 0px;
      display: inline-block;
      width: 75px;
      padding: 2px;
      border-radius: 5px;
    }
    .grass {
      background-color: green;
    }
    .fire {
      background-color: lightcoral;
    }
    .poison {
      background-color: violet;
    }
    .normal {
      background-color: lightgray;
    }
    .water {
      background-color: lightskyblue;
    }
    .fighting {
      background-color: brown;
    }
    .flying {
      background-color: lightseagreen;
    }
    .ground {
      background-color: bisque;
    }
    .rock {
      background-color: burlywood;
    }
    .bug {
      background-color: greenyellow;
    }
    .ghost {
      background-color: purple;
    }
    .electric {
      background-color: yellow;
    }
    .psychic {
      background-color: pink;
    }
    .ice {
      background-color: cyan;
    }
    .dragon {
      background-color: cornflowerblue;
    }
    .dark {
      background-color: darkslategrey;
    }
    .steel {
      background-color: gray;
    }
    .fairy {
      background-color: lightpink;
    }
  }
}
</style>
