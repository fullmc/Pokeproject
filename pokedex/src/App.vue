<template>
  <v-app class="">
    <nav>
      <router-link to="/">
          <v-img src="@/assets/pokelogo.png" width="25%" class="mx-auto mt-10" @click="toHome()" style="cursor:pointer"></v-img>
      </router-link>
    </nav>
    <router-view/>
  </v-app>
</template>

<script>
 export default {
  name:'App',

  methods: {
    toHome(){
      window.location.href = 'http://localhost:8080/'
    },
  },
 }
</script>

<style>
#app {
  background-color: var(--v-background-base, rgb(63,113,180));
  width: 100vw;
}
</style>
