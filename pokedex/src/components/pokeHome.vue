<template>
    <v-card class="mx-auto d-flex flex-column justify-center align-center pa-5 " outlined color='white'
        style="cursor:pointer;" @click="toDetails()">
        <v-img :src="`https://img.pokemondb.net/artwork/large/${name}.jpg`" class="img-responsive" height="60" contain ></v-img>
        <v-card-text class="pa-0">
            <p class="text--primary card-name text-center mb-0">{{ formattedName }}</p>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    name: 'list-item',
    props: ["name", "url"], //propriétés nécessaires au composant

    data() {
        return { //là où les données utilisées seront stockées
        }
    },

    computed: {
        formattedName() {
        return this.name.replace(/\s+/g, "").replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
        //(/w) = 1ère lettre de chaque mot et y applique la bonne transformation
        // (\w*) = lettres restantes 
        // (/g) = pas compris
        },
        pokeIndex() {
            return this.url.split("/")[6] // -> index du pokemon = url du pokemon , renvoie un tableau et récupère le 5ème élément qui sera affecté à pokeIndex[]
        }
    },
   
    mounted() {
        // this.handleClick(); // clic sur le pokémon -> exécute la fonction une fois que le composant est crée donc réclame 161 requêtes en même temps pour les 161 pokémons = beug
        //récup l'index du pokemon
    },

    methods: { //foncton asynchrone = s'exécute en amont sans bloquer le code 
        toDetails() {
            this.$router.push(`/pokemon/${this.pokeIndex}`)
        },
    }
}

</script>
<style>
    .img-responsive {
        max-width: 100%;
        max-height: 100%;
    }
    p {
        font-size: 1em;
        font-weight:500;
        padding-top:20px;
    }
</style>