import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [
    vuexLocal.plugin
],

  state: {
    lastVisitedPage: 1,
    lastSearch: "",
    lastItem: 20,
  },

  getters: { //définit des méthodes qui peuvent être utilisées pour récupérer les valeurs du state
    lastVisitedPage(state){
      return state.lastVisitedPage //renvoie la valeur de "lastVisitedPage" dans le state.
    },
    lastSearch(state){
      if (!state.lastSearch) return ""
      else return state.lastSearch
    },
    lastItem(state){
      return state.lastItem
    }
  },

  mutations: { // modifie l'état de l'application
    updatePage(state,page){
      state.lastVisitedPage = page // met à jour la valeur de "lastVisitedPage" dans le state
    },
    updateSearch(state,search){
      state.lastSearch = search
    },
    updateItem(state,item){
      state.lastItem = item
    }
  },

  actions: { //définit des méthodes qui peuvent déclencher des mutations en les appelant
    updatePage({commit}, page ){ 
      // {commit} pour accéder aux mutations, 'page' = valeur optionnelle qui est passée comme argument à la mutation
      commit('updatePage',page) // appelle la mutation "updatePage" en utilisant la méthode "commit".
    },
    updateSearch({commit}, search){
      commit('updateSearch', search)
    },
    updateItem({commit}, item){
      commit('updateItem', item)
    }
  },
  
  modules: {},
})
