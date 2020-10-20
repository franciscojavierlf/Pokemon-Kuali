<template>
  <b-navbar id="navbar" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>
      <router-link id="title" to="/">

    <img id="icon" src="@/assets/pokeball.png" />
      Pokémon Companion
      </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav> </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <img id="world" src="@/assets/world.png"/>
        <b-form-select id="lang-select" v-model="selectedLanguage"
        @change="changeLanguage" class="mb-3">
          <b-form-select-option value="de">Deutsch</b-form-select-option>
          <b-form-select-option value="en">English</b-form-select-option>
          <b-form-select-option value="es">Español</b-form-select-option>
          <b-form-select-option value="fr">Français</b-form-select-option>
          <b-form-select-option value="it">Italiano</b-form-select-option>
          <b-form-select-option value="ko">한국어</b-form-select-option>
          <b-form-select-option value="ja-Hrkt">日本語</b-form-select-option>
        </b-form-select>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Translations from '@/lang/translations';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigator extends Vue {
  private t = Translations;

  private selectedLanguage = 'en';

  private changeLanguage(lang: string) {
    this.$store.commit('setLanguage', lang);
  }
}
</script>

<style lang="scss">
#navbar {
  background-color: #ba4c50 !important;
}
#icon {
  width: 35px;
}
#world {
  filter: brightness(0) invert(1);
  width: 30px;
  height: 25px;
  margin-top: 15px;
  padding-right: 5px;
}
#title {
  text-decoration: none;
  color: white;
}

#lang-select {
  margin-top: 10px;
}

</style>
