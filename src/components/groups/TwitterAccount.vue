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
            class="profile-pic"
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
          :account="account"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.is-dragging{
  .account-container{
    height: 33%;
  }
}
.account-container {
  max-height: 100%;
  overflow-x: hidden;
}
.account {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  // max-height: 100%;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  @media(min-width: 900px){
    max-height: 100%;
  }
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
      overflow: hidden;
    }
      .profile-pic{
        max-width: 100%;
        max-height: 100%;
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
// import helper from '../../functions/helper.js'
import axios from 'axios'

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
      feedType: 'tweets', // or 'mentions'
      // isLoading: true,
    }
  },
  computed: {
    profilePicAlt(){
      return this.profilePicSrc ? `${this.account}'s profile image` : 'User profile pic not available'
    }
  },
  mounted(){
    axios
      .get(`http://localhost:7890/1.1/users/show.json?screen_name=${this.account}`)
      .then(res=>{
        let imageURL = res.data.profile_image_url.replace('_normal', '')
        this.profilePicSrc = imageURL
      })
      .catch(err=>{
        // eslint-disable-next-line
        console.log(err)        
      })
  }
}
</script>
