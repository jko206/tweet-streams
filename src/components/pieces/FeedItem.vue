<template>
  <div class="feed-item">
    <div class="feed-main">
      <div 
        class="feed-text"
        v-html="feedText"
        @click="gotoTweet($event)"
      />
      <div class="feed-info">
        <div class="feed-time">
          <div class="rel-time">
            {{feedRelTime}}
          </div>
          <div class="abs-time">
            {{feedAbsTime}}
          </div>
        </div>
        <!-- 
        Enabling this would toggle users who liked the tweet.
        <div 
          class="feed-likes-wrap"
          @click="showLikers = !showLikers"
        > 
        -->
        <div 
          class="feed-likes-wrap"
        >
          <div 
            :class="[
              'like-icon',
              {'show-close-button' : showLikers}
            ]"
          >
            <img
              src="../../assets/like-icon.png"
              :alt="likeIconAlt"
            />
            <div class="close-button">
              &times;
            </div>
          </div>
          <div class="like-count">
            {{likeCount}}
          </div>
        </div>
      </div>
    </div>
    <div 
      :class="[
        'likers',
        {'show': showLikers}
      ]"
    >
      <a
        v-for="liker in likers"
        :href="'https://twitter.com/' + liker"
        :key="liker"
        target="new"
      >
        @{{liker}}
      </a>
    </div>
    <div 
      class="feed-media"
      v-if="media && media.length"
    >
      <div 
        class="media-container"
        v-for="(medium, idx) in media"
        :key="idx"
      >
        <a
          :href="medium.media_url"
        > 
          <img 
            v-if="medium.type === 'photo'"
            alt="attached image"
            :src="medium.media_url"
          />
          {{medium.url}}
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.feed-item{
  text-align: left;
  border: 1px solid whitesmoke;
}
  //.feed-main
    .feed-text {
      min-height: 80px;
      line-height: 1.5;
      &:hover{
        background: gainsboro;
        cursor: pointer;
      }
    }

    .feed-info {
      display: flex;
      height: 2rem;
      align-items: center;
      font-size: 0.875rem;
      color: gray;
      border-top: 1px solid whitesmoke;
    }
      .feed-time{
        flex: 1 1 auto;
        overflow: hidden;
        height: 2rem;
        .rel-time, .abs-time{
          height: 2rem;
          transition: top 0.2s linear;
          display: flex;
          align-items: center;
          top: 0;
        }
        &:hover{
          .rel-time, .abs-time{
            top: -2rem;
          }
        }
      }

      .feed-likes-wrap{
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        width: 80px;
        justify-content: space-between;
      }
        .like-count{
          text-align: right;
          flex: 1 1 auto;
          padding: 0 5px;
        }
        .like-icon{
          width: 30px;
          height: 30px;
          overflow: hidden;
          img{
            width: 80%;
            margin: 10%;
            position: absolute;
            top: 0;
            transition: top 0.1s linear;
          }
          .close-button {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            top: 100%;
            transition: top 0.1s linear;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: pink;
            &:hover{
              color: red;
            }
          }
          &.show-close-button{
            img{
              top: -100%;
            }
            .close-button{
              top: 0;
            }
          }
        }
      .feed-time, .feed-likes-wrap{
        &:hover{
          color: black;
          cursor: pointer;
        }
      }
  .likers {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.1s linear;
    background: #c5c5c5;
    width: calc(100% + 22px);
    left: -11px;
    box-shadow: inset 0px 3px 5px grey;
    a {
      display: flex;
      width: 100%;
      height: 40px;
      align-items: center;
      &:hover{
        background: #2c3d50;
        color: white;
      }
    }
    &.show {
      padding: 5px;
      max-height: 400px;
    }
  }

.feed-media{
  img{
    width: 100%;
  }
}


</style>

<script>
/**
 * @param text - string of text with links, mentions, symbols and URLs
 * @param replacers - array of links, mentions, symbols, and URLs (only one type)
 * @param baseURL - 
 */
function replaceTextWithHTML(text, replacees, replaceGenerator, specialChar){
  replacees.forEach(replacee=>{
    let replacer = replaceGenerator(replacee, specialChar)
    text = text.replace(specialChar + replacee, replacer)
  })
  return text
}

export default {
  props: [
    'feed'
  ],
  data() {
    let media = this.feed.entities.media
    return {
      likers: [
        'abbey',
        'betty',
        'charlie',
        'O_OO_OO_OO_OO_O'
      ],
      media,
      showLikers: false,
    }
  },
  computed: {
    feedText(){
      // destructure
      let {
        text, 
        entities
      } = this.feed
      
      let {
        hashtags,
        symbols,
        urls,
        user_mentions,
      } = entities

      // extract the actual texts we want
      hashtags = hashtags.map(tag=>tag.text)
      symbols = symbols.map(symbol=> symbol.text)
      // urls = urls.map(url => url.url)
      user_mentions = user_mentions.map(user=>user.screen_name)
      
      // generator for replacement texts
      const hashtagLink = hashtag => `<a target="new" href="https://twitter.com/hashtags/${hashtag}">#${hashtag}</a>`
      const symbolLink = symbol => `<a target="new" href="https://twitter.com/search?q=%24${symbol}">$${symbol}</a>`
      const anchorURL = url => `<a target="new" href="${url}">${url}</a>`
      const userLink = user => `<a target="new" href="https://twitter.com/${user}">@${user}</a>`

      // actual replacement
      text = replaceTextWithHTML(text, hashtags, hashtagLink, '#')
      text = replaceTextWithHTML(text, symbols, symbolLink, '$')
      // text = replaceTextWithHTML(text, urls, anchorURL, '')
      text = replaceTextWithHTML(text, user_mentions, userLink, '@')

      // process urls in text
      urls.forEach(urlObj=>{
        let {
          display_url,
          expanded_url,
          url
        } = urlObj
        const aTag = `<a href="${expanded_url}" target="new">${display_url}</a>`
        text = text.replace(url, aTag)
      })


      return text
    },
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
        likes += ''
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
    },
    feedRelTime(){
      let timeStamp = this.feed.time
      let d = new Date(timeStamp)
      let now = new Date()
      let diff = Math.floor((now - d) / 1000)
      let hour = 3600 // sec
      if(diff < hour){
        let min = Math.round(diff / 60)
        return `${min}m`
      } else if(diff < hour * 24 ){
        let hour = Math.round(diff / 3600)
        return `${hour}h`
      } else{
        let days = [
          'Mon',
          'Tue', 
          'Wed',
          'Thu',
          'Fri',
          'Sat',
          'Sun',
        ]
        days = `(${days.join('|')})`
        let daysRegex = new RegExp(days)
        let str = d.toDateString().replace(daysRegex, '').trim()
        let year = 365 * 24 * 60 * 60 * 1000 // ms
        if(d > now - year){
          // tweet happened this year.
          // remove the last 4 char (the year) and the space and return
          return str.substring(0, str.length - 4).trim()
        }
        return str
      }
    },
    feedAbsTime(){
      let timeStamp = this.feed.time
      let d = new Date(timeStamp)
      return d.toLocaleString()

    }
  },
  methods: {
    gotoTweet(event){
      const {
        id_str, // status id
        screenName,  
      } = this.feed
      const url = `https://twitter.com/${screenName}/status/${id_str}`
      
      
      let targetTag = event.target.tagName
      if(targetTag !== 'A') window.open(url)
    }
  }
}
</script>
