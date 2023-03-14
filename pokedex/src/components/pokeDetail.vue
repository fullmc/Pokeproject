<template lang="">
    <v-container fluid class="d-flex align-center justify-center ">
    <v-card class="mx-auto" width="40%" depressed outlined>
      <v-row class="d-flex align-center primary--text">
        <v-col cols="12" md="4" class="d-flex align-center pl-12">
          <img :src="`https://img.pokemondb.net/artwork/large/${selected_pokemon.name}.jpg`" alt="pokemon" class="mx-auto" width="100%" />
        </v-col>
        <v-col cols="12" md="8">
          <v-card-title class="text-h5 overline font-weight-bold">{{ upperCase(selected_pokemon.name) }}</v-card-title>
          <v-card-text class=" text-start body-1">
            <span class="font-weight-bold text-overline">Ability :</span> {{ upperCase(selected_pokemon.abilities[0].ability.name) }}
          </v-card-text>
          <v-card-text class ="text-start body-1">
            <span class="font-weight-bold text-overline"> Base XP :</span> {{selected_pokemon.base_experience}}
          </v-card-text>
          <v-card-text class ="text-start body-1">
            <span class="font-weight-bold text-overline">Ability :</span> {{upperCase(selected_pokemon.abilities[0].ability.name)}}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>import 

axios from 'axios' 
export default {
    name: "pokeDetail",
    props: ["selected_pokemon", 'id'],
   
    methods: {
        upperCase(name) {
            if (!name) return;
            const newName = name.toLowerCase() //change le nom pour le mettre en minuscule
                .split(" ") // sépare en tableau de mots séparés par des espaces
                .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)) //convertit la 1ère lettre de chaque mot en majuscule + concaténation du reste
                .join(" ") // concatène tous les éléments d'une liste en une seule chaine de caractère. On met entre "" le séparateur qu'on souhaite

            return newName;
        },
        async getPokemonDetails(id) {
            try {
                const res = await axios.get(id)
                this.pokemon = res.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="">
    
</style>