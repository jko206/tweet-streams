<template>
  <div id="app">
    <Draggable
      :class="[
        'account-containers',
        {'grid-view' : viewMode === 'grid'},
      ]"
      v-model="accounts"
    >
      <TwitterAccount
        v-for="acct in accounts"
        :key="acct.id"
        :account="acct"
      />
    </Draggable>
  </div>
</template>

<script>
import TwitterAccount from './components/groups/TwitterAccount.vue'
import settings from './functions/settings.js'
import Draggable from 'vuedraggable'

export default {
  name: 'app',
  components: {
    TwitterAccount,
    Draggable,
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
.account-containers{
  padding: 20px;
  max-width: 1500px;
  // height: calc(100vh - 120px);
  width: 100%;
  max-width: 600px;
  margin: auto;
  
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 20px;
  
  @media(min-width: 900px){
    max-width: 1500px;
    margin: 60px auto;
    &.grid-view{
      grid-template-columns: repeat(3, minmax(260px, 33.33333%));
      // max-height: calc(100vh - 120px);
    }
  }

}
</style>
