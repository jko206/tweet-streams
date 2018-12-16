<template>
  <div class="account-container">
    <div class="drop-zone"></div>
    <div class="account">
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
            {'isActive' : feedType === 'tweets'}
          ]"
          @click="feedType = 'tweets'"
        >
          Tweets
        </div>
        <div
          :class="[
            'tab',
            {'isActive' : feedType === 'mentions'}
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
.accounts-container{
  @extend %dead-center;
  height: 100%;
}
</style>
<script>
import helper from '../../functions/helper.js'
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
