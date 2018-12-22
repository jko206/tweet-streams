<template>
  <div class="option-container themes-option">
    <div class="option-title">
      Themes
    </div>
    <div class="options">
      <div 
        :class="[
          'option',
          'blue',
          {'curr-theme' : $store.state.currentTheme === 'blue'}
        ]"
        @click="$store.commit('changeTheme', 'blue')"
      />
      <div 
        :class="[
          'option',
          'red',
          {'curr-theme' : $store.state.currentTheme === 'red'}
        ]"
        @click="$store.commit('changeTheme', 'red')"
      />
      <div 
        :class="[
          'option',
          'gray',
          {'curr-theme' : $store.state.currentTheme === 'gray'}
        ]"
        @click="$store.commit('changeTheme', 'gray')"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>

.option-container{
  margin: 10px;
  padding: 10px;
}
.option-title{
  font-size: 2rem;
  text-align: left;
}

.themes-option .options{
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.themes-option .option{
  border: 1px solid gainsboro;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.themes-option .blue{
  background: #2c3d50;
}
.themes-option .red{
  background: #581717;
}

.themes-option .gray{
  background: #3e3e3e;
}

.curr-theme::before{
  content: '';
  position: absolute;
  left: -2px;
  top: -2px;
  width: 100%;
  height: 100%;
  border: 2px solid black;
}

</style>
