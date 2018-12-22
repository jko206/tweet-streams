export default {
  getSettings(prop){
    let val = localStorage.getItem(prop)
    if(val === null){
      if(prop === 'accounts'){
        return [
          'newsycombinator',
          'ycombinator',
          'MakeSchool'
        ]
      }
    }
    return JSON.parse(val)
  },
  saveSetting(prop, val){
    val = JSON.stringify(val)
    localStorage.setItem(prop, val)
  }
}