<template>
  <div id="app">
    <Navigator/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigator from '@/components/Navigator.vue';

@Component({
  components: {
    Navigator,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
body {
  background-image: url('assets/background.png');
  background-size: 75px;
  background-color: #82bacf;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: transparent;
}
</style>
