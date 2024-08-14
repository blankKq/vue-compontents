<template>
  <div id="app">
    <MenuPage></MenuPage>
    <div class="contanier">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuPage from "@/components/layout/MenuPage"
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  .contanier {
    flex: 1;
  }
}
</style>
