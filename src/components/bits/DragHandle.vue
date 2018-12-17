<template>
  <div 
    :class="[
      'drag-handle',
    ]"
  >
    <div class="grip"></div>
    <div class="grip"></div>
    <div class="grip"></div>
  </div>
</template>
<style lang="scss">
.drag-handle{
  width: 100%;
  height: 100%;
  @extend %dead-center;
  flex-direction: column;
  cursor: pointer;
  cursor: -webkit-grab;
  .grip{
    width: 25px;
    height: 2px;
    background: gainsboro;
    margin: 1px;
  }

  &.is-grabbed{
    cursor: move;
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }
}
</style>
<script>
export default {
  data(){
    return {
      isGrabbedState: false,
    }
  },
  methods: {
    isGrabbed(e, state){
      this.isGrabbedState = state
      
    }
  }
}
</script>
