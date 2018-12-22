<template>
  <div 
    :class="[
      'tribar',
      {'is-open' : $store.getters.isMenuOpen}
    ]"
    @click="$store.commit('toggleMenu')"
  >
    <div 
      class="tribar-stripe"
      v-for="n in 3"
      :key="n"
      :style="{
        background: $store.getters.buttonColor
      }"
    />
  </div>
</template>
<style lang="scss" scoped>
.tribar {
  position: fixed;
  top: 0;
  right: 20px;
  width: 50px;
  height: 50px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  
  &.is-open{
    .tribar-stripe{
      position: absolute;
      top: 23px;

      &:nth-child(1){
        transform: rotate(45deg);
      }
      &:nth-child(2){
        opacity: 0;
      }
      &:nth-child(3){
        transform: rotate(-45deg);
      }
    }
  }
}

.tribar-stripe{
  height: 3px;
  width: 40px;
  position: absolute;

  background: #5f80a5;
 
  transition: all 0.05s linear;
  transform: rotate(0);
  transform-origin: center center;
  &:nth-child(1){
    top: 10px;
  }
  &:nth-child(2){
    top: 20px;
  }
  &:nth-child(3){
    top: 30px;
  }
}

</style>
