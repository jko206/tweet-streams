<template>
  <div class="account-container">
    <div class="drop-zone"></div>
    <div 
      class="account" 
    >
      <div class="drag-handle-container">
        <DragHandle />
      </div>
      
      <div class="profile-container">
        <div class="profile-pic-wrap">
          <img 
            v-if="profilePicSrc"
            :src="profilePicSrc"
            :alt="profilePicAlt"
          />
        </div>
        <div class="twitter-handle-wrap">
          <a 
            :href="'http://twitter.com/' + account">
            @{{account}}
          </a>
        </div>
      </div>

      <div class="tabs">
        <div
          :class="[
            'tab',
            {'is-active' : feedType === 'tweets'}
          ]"
          @click="feedType = 'tweets'"
        >
          Tweets
        </div>
        <div
          :class="[
            'tab',
            {'is-active' : feedType === 'mentions'}
          ]"
          @click="feedType = 'mentions'"
        >
          Mentions
        </div>
      </div>

      <div class="feed-stream-container">
        <FeedStream 
          :feedType="feedType"
          :handle="account"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.account-container {
  max-height: 100%;
}
.drop-zone{
  
}
.account {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  max-height: 100%;
}
  .drag-handle-container {
    top: -10px; 
    height: 20px;
    flex: 0 0 auto;
  }
  .profile-container {
    display: flex;
    height: 100px;
    padding: 10px;
    flex: 0 0 auto;
  }
    .profile-pic-wrap{
      @extend %dead-center;
      height: 80px;
      width: 80px;
      flex: 0 0 auto;
      border-radius: 100%;
      background: gray;
    }
      .profile-pic{
        min-width: 100%;
        min-height: 100%;
      }
    .twitter-handle-wrap{
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      padding: 10px;
    }
  .tabs {
    height: 40px;
    flex: 0 0 auto;
  }
    .tab{
      @extend %dead-center;
      position: absolute;
      top: 0;
      width: 50%;
      background: gray;
      height: 100%;
      &:last-child{
        left: 50%;
      }
      &.is-active{
        background: white;
        border: 1px solid gainsboro;
        border-bottom-width: 0;
      }
    }
  .feed-stream-container {
    flex: 1 1 330px;
    border: 1px solid gainsboro;
    border-top-width: 0;
    // overflow: auto;
  }

</style>
<script>
import DragHandle from '../bits/DragHandle.vue'
import FeedStream from '../modules/FeedStream.vue'
export default {
  props: {
    account: {
      type: String,
      required: true,
    }
  },
  components: {
    DragHandle,
    FeedStream,
  },
  data(){
    return {
      profilePicSrc: '',
      profilePicAlt: 'User profile pic not available',
      feedType: 'tweets' // or 'mentions'
    }
  },


}
</script>
