<template>
    <div class="feed-stream">
      <FeedItem 
        v-for="(feed, idx) in tweets"
        :key="idx"
        :feed="feed"
      />
    </div>
</template>
<style lang="scss">
.feed-stream{
  display: grid;
  grid-gap: 10px;
  padding: 10px;
}
</style>

<script>

import helper from '../../functions/helper.js'
import FeedItem from '../pieces/FeedItem.vue'

export default {
  components: {
    FeedItem,
  },
  props:[
    'feedType',
    'handle'
  ],
  data(){
    return {
      tweets: [],
      mentions: [],
    }
  },
  methods: {
    getTweets(){
      this.tweets = helper.getTweets(this.handle)
    },
    getMentions(){
      this.mentions = helper.getMentions(this.handle)
    }
  },
  mounted(){
    if(this.feedType === 'tweets') this.getTweets()
    else this.getMentions()
  }
}
</script>
