<template>
  <div class="feed-item">
    <div class="feed-main">
      <div class="feed-text">
        {{feed.text}}
      </div>
      <div class="feed-info">
        <div class="feed-time">
          {{feed.time}}
        </div>
        <div class="feed-likes-wrap">
          <div class="like-icon">
            <img
              src="../../assets/like-icon.png"
              :alt="likeIconAlt"
            />
          </div>
          <div class="like-count">
            {{likeCount}}
          </div>
        </div>
      </div>
    </div>
    <div 
      class="feed-images"
      v-if="feed.images.length"
    >

    </div>
  </div>
</template>
<style lang="scss">
.feed-item{
  text-align: left;
  border: 1px solid whitesmoke;
}

.feed-text {
  min-height: 80px;
  line-height: 1.5;
}

.feed-info {
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 0.875rem;
  color: gray;
  border-top: 1px solid whitesmoke;
}

.feed-time{
  flex: 1 1 auto;
}
.feed-likes-wrap{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 80px;
  justify-content: space-between;
}
.feed-time, .feed-likes-wrap{
  &:hover{
    color: black;
    cursor: pointer;
  }
}
.like-icon{
  width: 30px;
  height: 30px;
  overflow: hidden;
  img{
    width: 80%;
    margin: 10%;
  }
}



</style>

<script>
export default {
  props: [
    'feed'
  ],
  data() {
    return {

    }
  },
  computed: {
    likeIconAlt() {
      if(this.feed.likes === 0){
        return 'This tweet hasn\'t received any likes.'
      } else {
        return `This tweet has received ${this.feed.likes} likes!`
      }
    },
    likeCount(){
      let {likes} = this.feed
      if(likes < 1e3){
        likes += 'K'
      } else if(likes < 1e4){
        likes = Math.round(likes / 100) / 10 + 'K'
      } else if(likes < 1e6){
        likes = Math.round(likes / 1e3) + 'K'
      } else if(likes < 1e9){
        likes = Math.round(likes / 1e6) + 'M'
      } else {
        likes = Math.round(likes / 1e9) + 'B'
      }
      return likes
    }
  }
}
</script>
