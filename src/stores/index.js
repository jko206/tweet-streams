import Vue from 'vue'
import Vuex from 'vuex'
import settings from '../functions/settings.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // registered dynamically via mutations
    // when registered, by default, it's loading
    // -1: error
    //  0: loaded
    //  1: loading
    accounts: settings.getSettings('accounts') || [],
    isMenuOpen: false,
    layoutColumnCount: settings.getSettings('layoutColumnCount') || 3, 
    currentTheme: settings.getSettings('theme') || 'blue',
  },
  mutations: {
    toggleMenu(state){
      state.isMenuOpen = !state.isMenuOpen
    },
    changeLayout(state, columns){
      state.layoutColumnCount = columns
      settings.saveSetting('layoutColumnCount', columns)
    },
    changeTheme(state, color){
      state.currentTheme = color
      settings.saveSetting('theme', color)
    },
    updateAccountList(state, newList) {
      state.accounts = newList
      settings.saveSetting('accounts', newList)
    }
  },
  getters: {
    isMenuOpen(state){
      return state.isMenuOpen
    },
    bgColor(state){
      return state.currentTheme === 'blue' ? '#2c3d50'
        : state.currentTheme === 'red' ? '#581717'
        : '#3e3e3e'
    },
    buttonColor(state) {
      return state.currentTheme === 'blue' ? '#5f80a5'
        : state.currentTheme === 'red' ? '#af2f2f'
          : 'darkgray'
    },
  },
  actions: {
    
  },
})