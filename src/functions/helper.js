import axios from 'axios'


const baseURL = `http://localhost:7890`

export default {
  getTweets({ screenName, /*until,*/ nextResults}){
    // if(twitterID){
    //   return getRandomFeed()
    // }

    let query = {
      'screen_name': '@' + screenName,
    }
    if (nextResults) {
      query = {'next-result' : nextResult}
    }
    
    // let reqURL = encodedQuery('/statuses/user_timeline.json', query)
    let reqURL = `${baseURL}/1.1/search/tweets.json?q=@${screenName}&count=30`
    return axios.get(reqURL)
  },
  getMentions(screenName){
    return this.getTweets(screenName)
  },
  getProfilePic(screenName){
    return 
  }
}


function queryBuilder(){

}

function encodedQuery(searchURL, queryObj){
  let host = 'http://localhost'
  let port = '7890'
  let queryStr = ''
  for(let key in queryObj){
    let val = queryObj[key]
    if(val === undefined || val === null) continue
    queryStr += `${key}=${val}`
  }
  // let result = host + port + searchURL + '?' + queryStr
  let result = `${host}:${port}${searchURL}?${queryStr}`
  return encodeURI(result)
}

/*


on creation, check for accounts
  - if accounts, load accounts
  - if no accounts, load the three default ones. 

For each account,
  - when account is created, it should be loading. 
  - once loaded

 */