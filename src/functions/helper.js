export default {
  getTweets(twitterID){
    if(twitterID){
      return getRandomFeed()
    }
  },
  /**
   * @param {string|number} tweetID - The id of tweet for which to retrieve 
   *    the number of likes
   */
  getMentions(twitterID){
    return this.getTweets(twitterID)
  }
}

function randomLoremIpsum(){
  let text = (`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec malesuada dolor, eget pellentesque lorem. Etiam urna augue, rutrum eu augue blandit, vestibulum placerat tortor. Sed ac enim molestie, viverra mi fringilla, varius ex. Fusce aliquet porttitor dolor nec faucibus. Morbi odio urna, interdum ac tellus vitae, finibus bibendum felis. Nullam libero ante, pulvinar at odio eu, vestibulum malesuada libero. Nullam blandit ipsum id neque tristique, vitae rutrum sapien blandit. Pellentesque scelerisque lacus lorem, a blandit lorem viverra et. Donec lorem justo, lacinia consequat magna in, gravida rutrum massa. Cras posuere, diam vel dapibus molestie, velit elit convallis tortor, vel posuere felis tortor bibendum nibh. Pellentesque eget turpis a turpis lacinia auctor non ut odio.

Suspendisse potenti. Pellentesque a interdum nibh. Nunc nunc magna, efficitur nec mattis ornare, blandit at mi. Nulla libero lacus, mollis a gravida nec, sagittis sit amet ipsum. Suspendisse pellentesque, tellus vitae efficitur dignissim, ligula nisl maximus sem, a volutpat metus odio eget ex. Quisque pharetra nibh id malesuada viverra. Suspendisse orci massa, gravida egestas dolor at, suscipit elementum justo. Aenean lorem augue, accumsan non erat at, interdum finibus sem. Suspendisse vitae tortor sed justo porta bibendum nec sed elit. Aenean quis dapibus ante. Donec commodo, quam sed scelerisque sagittis, lectus lorem sodales magna, aliquet interdum odio nisi eu magna. Praesent a orci id nulla aliquam consectetur.

Donec vestibulum dapibus nisi, a ornare mi blandit pharetra. Mauris id accumsan elit, nec gravida neque. Aliquam ut nisl sit amet eros aliquet maximus. Phasellus commodo tristique risus, non bibendum quam euismod sed. Fusce placerat ultricies augue eget pellentesque. Aliquam scelerisque molestie lacus quis luctus. Suspendisse fermentum tortor metus, sit amet condimentum tellus congue rutrum.

Pellentesque condimentum condimentum fermentum. Donec bibendum, ex in dictum tincidunt, nunc metus iaculis velit, quis ultrices sapien est eget dui. Integer quis nisl luctus, feugiat massa sit amet, tincidunt ex. Cras at elementum massa. Morbi suscipit ipsum est, in posuere erat gravida ac. Fusce condimentum efficitur augue pharetra blandit. Aenean ante mauris, fringilla nec mattis id, condimentum sed libero. Etiam fermentum neque nec sem pharetra, ac dapibus augue lacinia. Nunc rhoncus neque eu sapien feugiat, ornare semper justo cursus. Nullam quis pharetra ligula. Nulla sit amet tellus ut mi posuere dignissim. Vestibulum semper nisi vitae ante volutpat tempus. Donec vestibulum maximus purus, a sodales mi facilisis et. Integer ultrices elit mauris, at dictum metus consequat eu. Quisque purus metus, commodo in purus quis, pharetra ultricies massa. Vestibulum rutrum nec turpis quis pharetra.

Donec vel augue vitae justo scelerisque feugiat. Cras eget luctus ante. Aenean interdum sem a lorem ultrices varius. Praesent iaculis vulputate condimentum. Curabitur cursus lectus varius nunc fermentum dictum. Nunc maximus nulla a ligula faucibus eleifend. Vivamus pulvinar purus quis arcu congue, eget laoreet mi pulvinar. Nam rutrum, dui eget sagittis auctor, odio tellus gravida velit, sed dictum est est sit amet orci. Aliquam hendrerit purus odio, sit amet efficitur sapien consequat ut. Donec cursus rhoncus augue in consequat. Sed volutpat felis at augue auctor, at suscipit turpis tempus. Phasellus viverra id turpis ut pellentesque. Ut blandit ullamcorper ipsum, a efficitur justo facilisis at. Aliquam erat volutpat. Integer sollicitudin ultricies eros, et tincidunt dolor tincidunt laoreet. Duis ullamcorper auctor nulla, vitae tempor nisi elementum non.
  `).replace('\n', '')

  let from = Math.floor(Math.random() * text.length)
  let length = Math.floor(Math.random() * 280)
  return text.substr(from, length)
}

function randomImages(){
  let imageCount = Math.floor(Math.random() * 5) // [0, 4] images
  let imageUrls = []
  while(imageCount--){
    // TODO: FILL IN HERE TO RETURN RANDOM IMAGES
    imageUrls.push('')
  }
  return imageUrls  
}

function randomLikes(){
  return Math.floor(Math.random() * 1e9)
}

function getRandomFeed(){
  let feedNumber = Math.floor(Math.random() * 20)
  let feeds = []
  while (feedNumber--) {
    feeds.push({
      text: randomLoremIpsum(),
      images: randomImages(),
      likes: randomLikes(),
      time: 'MMM DD, 2018',
    })
  }
  return feeds
}