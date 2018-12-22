<template>
  <div 
    :class="[
      'options-panel',
      {'is-open' : $store.state.isMenuOpen}
    ]" 
  >
    <AccountOrderArranger />
    <PageLayoutOptions/>
    <ThemeOptions />
  </div>
</template>
<style lang="scss" scoped>

.options-panel{
  position: fixed;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  top: 0; 
  background: white;
  z-index: 5;
  right: -400px;
  transition: right 0.1s linear;
  padding-top: 70px;
  transition: all 0.05s linear;
  &.is-open{
    right: 0px;
    box-shadow: -8px 0px 6px #2d2d2da8;
  }
}

</style>
<script>
import PageLayoutOptions from '../modules/PageLayoutOptions.vue'
import ThemeOptions from '../modules/ThemeOptions.vue'
import AccountOrderArranger from '../modules/AccountOrderArranger.vue'
export default {
  components: {
    PageLayoutOptions,
    ThemeOptions,
    AccountOrderArranger,
  }
}
</script>
