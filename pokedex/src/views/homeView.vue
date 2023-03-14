<template>
  <div>
    <v-container>
      <v-row class="mx-auto mt-6" :class="{'justify-center': $vuetify.breakpoint.smAndDown}" style="width:100%">
        <!-- ajoute la classe "justify-center" à la rangée si l'écran <= "sm" -->
        <v-col>
          <v-text-field v-model="search" type="search" label="I'm looking for ..." solo clearable dense clear-icone
            color="rgba(25,25,25,0.6)"></v-text-field>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 2" :lg="1" style="max-width:20%">
          <!-- nb de colonnes que la colonne doit occuper, en fonction de la taille de l'écran. écran <= "sm", la colonne occupe 12 colonnes, sinon elle en occupe 2. ":lg"= nb de col à occuper sur écrans larges-->
          <v-select placeholder="20" v-model="limit" :items="items" dense solo></v-select>
        </v-col>
      </v-row>
      <v-pagination class="my-8" v-model="page" :length="totalPages" :total-visible="($vuetify.breakpoint.smAndDown ? 3 : 5)" circle></v-pagination>
      <!-- :total-visible" = nb de boutons de pagination visibles à la fois en fonction de la taille de l'écran. écran <= "sm", 3 boutons visibles, sinon 5. -->
    </v-container>
        <!-- ajout classe "justify-center" à la rangée si l'écran est de taille "xs" -->
        <v-row v-if="loading" class="ma-16 d-flex flex-row rounded-lg justify-center"  >
          <v-col cols="12" sm="6" md="4" lg="3" v-for="(skeleton,index) in 6" :key="index">
            <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else class="ma-16 d-flex flex-row rounded-lg justify-center" >
          <v-col cols="12" sm="6" md="4" lg="3" v-for="(pokemon, index) in filteredPokemon" :key="index" >
            <pokeHome  :name="pokemon.name" :url="pokemon.url"></pokeHome>
          </v-col>
        </v-row>   
          <!-- nb de colonnes que la colonne doit occuper en fonction de la taille de l'écran. écran <= sm ? 12 colonnes, sinon 3 -->

  </div>
</template>

<script>
import axios from 'axios'
import pokeHome from "@/components/pokeHome.vue"

export default {
  name: 'homeView',
  components: {
    pokeHome,
  },

  data() {
    return {
      pokemons: [],
      // search: "",
      items: ["20", "50", "100"],
      // limit: 20, // nouvelle variable pour stocker la limite choisie
      count: 0,
      loading: true,
    }
  },

  computed: {
    filteredPokemon: function () {
      return this.pokemons.filter((pokemon) => {
        return pokemon.name.match(this.search);
      })
    },
    totalPages() {
      return Math.ceil(this.count / this.limit); //calcule le nb total de pages nécessaires pour afficher tous les pokemons présents dans "count"
    },
    offset() {
      return (this.page - 1) * this.limit; //calcul d'offset généralisé pour récup la valeur dans l'API et le rendre dynamique
    },
    page: {
      get() {
        return this.$store.getters.lastVisitedPage
      },
      set(newValue){
        return this.$store.dispatch("updatePage", newValue)
      },
    },
    search: {
      get(){
        return this.$store.getters.lastSearch
      },
      set(newValue){
        return this.$store.dispatch("updateSearch", newValue)
      }
    },
    limit: {
      get(){
        return this.$store.getters.lastItem
      },
      set(newValue){
        return this.$store.dispatch("updateItem", newValue)
      }
    }
  },

  mounted() {
    this.getPokemons(this.limit);
    console.log(this.$store.getters.lastItem)
  },

  methods: {
    getPokemons() { //récupère une liste de Pokémons depuis l'API. Les paramètres détèrminent la limite de la liste de Pokémon qu'on veut obtenir et la page à laquelle se trouve cette liste
    this.loading= true;

      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`) //first req to catch pokemons details
        //valeurs de limit et page insérées dans l'URL
        //offset= position de départ pour la liste de résultats qu'on souhaite obtenir.
        //'${(page - 1) * limit}' calcule la valeur de l'offset et génère dynamiquement l'URL en fonction des valeurs actuelles de limit et page
        // exemple, si page = 2 et limit = 10, offset =(2 - 1) * 10 = 10. => la liste de résultats commencera à partir du 11ème élément
        .then((res) => {
          this.pokemons = res.data.results;
          this.count = res.data.count;
          this.loading = false
        });
    },
  },

  watch: { // watchs properties (limit et page) and define functions that will be executated after updating the values.
    limit: function (newValue) { // function called with the new limit value as a parameter (newValue)
      this.getPokemons(newValue); // getPokemons() new API request when the limit is updated
    },
    page: function (newValue) {
      this.getPokemons(this.limit, newValue); //same unless the new req is about a new page but uses the same limit (ex. limit=x, x pokémons per page)
    }
  }
}

</script>

<style>

</style>