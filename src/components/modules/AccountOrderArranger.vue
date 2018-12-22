<template>
  <div class="option-container">
    <div class="option-title">
      Order accounts
    </div>
    <Draggable
      v-model="accountList"
      :options="{
        handle: '.drag-handle',
      }"
      class="accounts-container"
    >
      <div 
        v-for="acct in accountList"
        :key="acct"
        class="account-wrap"
      > 
        <div class="acct-title">
          @{{acct}}
        </div>
        <div class="drag-handle-wrap">
          <DragHandle/>
        </div>
      </div>
    </Draggable>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import DragHandle from '../bits/DragHandle.vue'

export default {
  components: {
    Draggable,
    DragHandle,
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
  }
}
</script>
<style lang="scss" scoped>
.option-container{
  margin: 10px;
  padding: 10px;
}
.option-title{
  font-size: 2rem;
  text-align: left;
}
.accounts-container{
  display: flex;
  flex-direction: column;
  align-items: left;
}
  .account-wrap {
    border: 1px solid gray;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    padding: 10px;
  }

  .account-title{
    flex: 1 1 auto;
  }
</style>
