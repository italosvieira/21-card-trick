<template>
    <CardTrick/>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CardTrick from './component/CardTrick.vue';

  @Component({
    components: {
      CardTrick,
    },
  })
  export default class App extends Vue {}
</script>

<style>
#body {
  margin: 0;
  padding: 0;
  background-color: #01431E;
  height: 100%;
}

#html {
  height: 100%;
}
</style>
