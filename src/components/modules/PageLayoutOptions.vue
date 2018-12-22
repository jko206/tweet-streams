<template>
  <div class="option-container layout-option">
    <div class="option-title">
      Layout
    </div>
    <div class="options">
      <div 
        :class="[
          'option-wrapper',
          {'curr-layout' : $store.state.layoutColumnCount === 1}
        ]"
        @click="$store.commit('changeLayout', 1)"
      >
        <div class="option-icon single-column">
          <div class="option-icon__column"/>
          <div class="option-icon__column"/>
          <div class="option-icon__column"/>
        </div>
        <div class="option-text">
          Single Column
        </div>
      </div>
      <div 
        :class="[
          'option-wrapper',
          {'curr-layout' : $store.state.layoutColumnCount === 3}
        ]"
        @click="$store.commit('changeLayout', 3)"
      >
        <div class="option-icon triple-column">
          <div class="option-icon__column"/>
          <div class="option-icon__column"/>
          <div class="option-icon__column"/>
        </div>
        <div class="option-text">
          Triple Column
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-option{
  display: none;
  @media(min-width: 900px){
    display: block;
  }
}
.option-container{
  margin: 10px;
  padding: 10px;
}
.option-title{
  font-size: 2rem;
  text-align: left;
}

.options{
  display: flex;
  flex-direction: column;
}
  .option-wrapper {
    display: flex;
    padding: 5px;
    margin: 5px;
    border: 1px solid transparent;
    border-radius: 5px;
    align-items: center;
    &:hover{
      border-color: gray;
    }
  }
    .option-icon{
      display: flex;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      .option-icon__column{
        background: gray;
      }
    }

.curr-layout{
  border-color: #2c3d50;
  .option-icon__column{
    background: #2c3d50;
  }
}

.single-column{
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  align-content: center;
  .option-icon__column{
    width: 30px;
    height: 25px;
    margin: 2px auto;
    flex: 0 0 auto;
  }
}
.triple-column{
  justify-content: stretch;
  .option-icon__column{
    flex: 1 1 auto;
    margin: 2px;
  }
  .option-icon__column:nth-child(1){
    height: 30px;
  }
  .option-icon__column:nth-child(2){
    height: 20px;
  }
  .option-icon__column:nth-child(3){
    height: 40px;
  }
}

</style>
