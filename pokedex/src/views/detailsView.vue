 <template lang="">

    <div class="mx-auto mt-16">
      <v-breadcrumbs :items="crumbsItems" class="justify-center" large dark>
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-btn :to="{ name: 'homeView' }">home</v-btn>
        <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="pyellow"></v-progress-circular>
        <pokeDetail v-else :selected_pokemon="pokemonData"></pokeDetail>
    </div>
</template>

<script>
    import pokeDetail from "@/components/pokeDetail.vue"
    import axios from 'axios';
    import { VProgressCircular } from "vuetify/lib";
    export default {
        
        name: "detailsView",
        components: {
            pokeDetail,
            VProgressCircular
        },

        data() {
            return{
                pokemonData: false,
                loading: true,
                crumbsItems: [
                  {
                    text: 'Pokemons',
                    disabled: false,
                    to: '/',
                  },
                  {
                    text: 'PokeCard',
                    disabled : true,
                    href: '/pokemon/:pokemonId',
                  },
                ],
            }       
        },

        computed: {
            pokeID(){
                return this.$route.params.pokemonId //lien avec le router
            },
        },

        mounted(){ //calls the method below, catches its value and display it once its created
            this.loadPokemonDetails()
        },

        methods: {
            async loadPokemonDetails() {
              
                this.loading = true
      
                try {
                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokeID}`) 
                    this.pokemonData = res.data
                    this.loading = false
                } catch (error) {
                    console.log(error)
                }
            },
        },
        watch: {
            "$route.params.pokemonId": function() { // watches ID updates in the URL
                this.loadPokemonDetails() // Loads new pokemon details
            }
        },
    }
</script>

<style scoped>
</style> 