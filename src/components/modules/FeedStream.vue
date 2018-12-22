<template>
  <div class="feed-stream">
    <div 
      class="wrapper"
      v-show="feedType === 'tweets'"
    >
      <FeedItem 
        v-for="(feed, idx) in tweets"
        :key="idx"
        :feed="feed"
      />
    </div>
    <div
      class="wrapper"
      v-show="feedType === 'mentions'"
    >
      <FeedItem 
        v-for="(feed, idx) in mentions"
        :key="idx"
        :feed="feed"
    />
    </div>
    <div 
      v-if="hasNoFeeds && !isLoading"
      class="no-feeds"
    >
      No tweets
    </div>
    <div v-if="isLoading" style="text-align: center;">
      <LoadingIcon/>
    </div>
    <div 
      v-else-if="isError"
      class="no-feeds"
    >
      Something went wrong :(
    </div>
    <button 
      v-if="!isLoading"
      @click="loadMore"
      class="load-more-statuses"
      :style="{
        background: $store.getters.buttonColor,
      }"
    >
      {{loaderButtonText}}
    </button>
  </div>
</template>
<style lang="scss">
// .feed-stream{
.wrapper{
  display: grid;
  grid-gap: 10px;
  padding: 10px;
}

.load-more-statuses {
  height: 3rem;
  width: 100%;
  max-width: 200px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: 0px;
}
</style>

<script>

// import helper from '../../functions/helper.js'
import FeedItem from '../pieces/FeedItem.vue'
import LoadingIcon from '../bits/LoadingIcon.vue'
import axios from 'axios'

const BASE_URL = "${BASE_URL}"
const INIT_LOAD_COUNT = 30
const NEXT_LOAD_COUNT = 10

export default {
  components: {
    FeedItem,
    LoadingIcon,
  },
  props:[
    'feedType',
    'account'
  ],
  data(){
    return {
      tweets: [],
      mentions: [],
      isLoading: true,
      isError: false,
      queryForNextTweetSet: null,
      queryForNextMentionSet: null,
    }
  },
  methods: {
    getStatuses(api){
      this.isError = false
      this.isLoading = true
      let screenName = this.account
      axios.get(api)
        .then(res=>{
          
          let tweets = this.feedType === 'tweets' ? res.data : res.data.statuses
          // eslint-disable-next-line
          // console.log(tweets)
          let newTweets = tweets
            .map(tweet=>{
              let {
                full_text,
                created_at,
                entities,
                favorite_count,
                id_str,
                retweeted_status
              } = tweet
              this.isError = false
              this.isLoading = false
              
              let text = retweeted_status ? 'RT: ' + retweeted_status.full_text : full_text
              entities = retweeted_status ? retweeted_status.entities : entities

              return {
                text, 
                time: created_at, 
                entities, 
                likes: favorite_count,
                id_str,
                screenName
              }
            })

          // eslint-disable-next-line
          // console.log(newTweets)

          if(this.feedType === 'tweets') this.tweets.push(...newTweets)
          else this.mentions.push(...newTweets)

          
          if(this.feedType === 'tweets'){
            let lastTweetID = newTweets[newTweets.length - 1].id_str
            // take the last digit of the tweet ID, decrement it,
            // then re-append it
            let temp = lastTweetID.split('')
            let lastDigit = temp.pop() >> 0 //parse int
            temp.push(lastDigit - 1)
            this.queryForNextTweetSet = temp.join('')
          } else {
            let nextResults = res.data.search_metadata.next_results
            this.queryForNextMentionSet = nextResults
            // console.log(nextResults)
          }
          this.isError = false
          this.isLoading = false
        })
        .catch(err=>{
          // eslint-disable-next-line
          console.log(err)
          this.isError = true
          this.isLoading = false
        })
    },
    getTweets(){
      let screenName = this.account
      // 'https://api.twitter.com/1.1/statuses/user_timeline.json'
      let api = `${BASE_URL}/1.1/statuses/user_timeline.json?screen_name=${screenName}&tweet_mode=extended`
      // let query = this.queryForNextTweetSet
      //   ? this.queryForNextTweetSet 
      //   : `screen_name=${screenName}&count=${loadCount}`
      if(this.queryForNextTweetSet){
        api += `&max_id=${this.queryForNextTweetSet}&count=${NEXT_LOAD_COUNT}`
      } else {
        api += `&count=${INIT_LOAD_COUNT}`
      }
      this.getStatuses(api)
    },
    getMentions(){
      let screenName = this.account
      const api = `${BASE_URL}/1.1/search/tweets.json`
      let query = this.queryForNextMentionSet 
        ? this.queryForNextMentionSet
        : encodeURI(`?q=@${screenName}&count=${INIT_LOAD_COUNT}`)
      this.getStatuses(api + query + '&tweet_mode=extended')
    },
    loadMore(){
      if(this.feedType === 'tweets') this.getTweets()
      else this.getMentions()
    },
  },
  computed: {
    hasNoFeeds(){
      return (this.feedType === 'tweets' && this.tweets.length === 0) || 
        (this.feedType === 'mentions' && this.mentions.length === 0)
    },
    loaderButtonText(){
      if(this.isError) return 'Try Again'
      let hasNoStatuses = (this.feedType === 'tweets' && !this.tweets.length) ||
        (this.feedType === 'mentions' && !this.mentions.length)
      if(hasNoStatuses) return 'Check for Tweets'
      else return 'Load More'
    }
  },
  watch: {
    feedType(newVal){
      let hasNoStatuses = (newVal === 'tweets' && this.tweets.length === 0) || 
        (newVal === 'mentions' && this.mentions.length === 0)
      if(hasNoStatuses) this.loadMore()
      this.isError = false
    }
  },
  created(){
    if(this.feedType === 'tweets') this.getTweets()
    else this.getMentions()
  },
}
</script>
