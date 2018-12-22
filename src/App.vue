<template>
  <div 
    id="app"
    :class="[
      {'lock-down' : $store.state.isMenuOpen},
    ]"
    :style="{
      'background-color' : $store.getters.bgColor
    }"
  >
    <TriBar />
    <OptionsPanel/>
    <Draggable
      :class="[
        'account-containers',
        {'triple-column' : $store.state.layoutColumnCount === 3},
        {'is-dragging' : isDragging},
      ]"
      v-model="accountList"
      :options="{
        handle: '.drag-handle',
      }"
    >
      <TwitterAccount
        v-for="acct in accountList"
        :key="acct"
        :account="acct"
      />
    </Draggable>
  </div>
</template>

<script>
import TwitterAccount from './components/groups/TwitterAccount.vue'
import Draggable from 'vuedraggable'
import TriBar from './components/pieces/TriBar.vue'
import OptionsPanel from './components/groups/OptionsPanel.vue'


export default {
  name: 'app',
  components: {
    TwitterAccount,
    Draggable,
    TriBar,
    OptionsPanel,
  },
  data(){
    return {
      viewMode: 'grid',
      isDragging: false,
    }
  },
  computed: {
    accountList: {
      get(){
        return this.$store.state.accounts
      },
      set(val){
        return this.$store.commit('updateAccountList', val)
      }
    }
  },
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
  &.lock-down{
    overflow: hidden;
  }
}
.account-containers{
  padding: 20px;
  padding-top: 50px;
  width: 100%;
  max-width: 600px;
  margin: auto;
  
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 20px;

  &.is-dragging{
    max-height: calc(100vh - 40px);
    overflow: auto;
  }
  
  @media(min-width: 900px){
    margin: 60px auto;
    &.triple-column{
      grid-template-columns: repeat(3, minmax(260px, 33.33333%));
      // max-height: calc(100vh - 120px);
      max-width: 1500px;
    }
  }

}
</style>
