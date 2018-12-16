<template>
  <div id="app">
    <div
      :class="[
        'accounts-container',
        viewMode,
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
      viewColumnCount: 3,
      accounts: settings.getSettings('accounts')
    }
  },
  computed: {
    viewMode(){
      return 'columns-' + this.viewColumnCount
    }
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
  color: #2c3e50;
  height: 100vh;
}
.accounts-container{
  display: grid;
  grid-template-columns: 1fr;
  @media(min-width: 600px){
    
  }
}
</style>
