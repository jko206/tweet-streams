<template>
  <div id="app">
    <div
      :class="[
        'accounts-container',
        {'grid-view' : viewMode === 'grid'},
      ]" 
    >
      <TwitterAccount
        v-for="acct in accounts"
        :key="acct.id"
        :account="acct"
      />
    </div>
  </div>
</template>

<script>
import TwitterAccount from './components/groups/TwitterAccount.vue'
import settings from './functions/settings.js'

export default {
  name: 'app',
  components: {
    TwitterAccount
  },
  data(){
    return {
      viewMode: 'grid',
      accounts: settings.getSettings('accounts')
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
@import 'styles/default';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2c3e50;
  height: 100vh;
  overflow: auto;
}
.accounts-container{
  display: grid;
  grid-template-columns: 300px;
  margin: 60px auto;
  grid-gap: 20px;
  padding: 20px;
  width: auto;
  max-width: 1500px;
  @media(min-width: 900px){
    &.grid-view{
      grid-template-columns: repeat(3, minmax(260px, 33.33333%));
    }
  }

}
</style>
