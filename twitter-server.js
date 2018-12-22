// var spawn = require('child_process').exec;

// spawn('twitter-proxy');
// spawn('http-server');

// console.log('Server running on http://localhost:8080');
// console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');

var twitterProxyServer = require('twitter-proxy');
twitterProxyServer({
  "consumerKey": "SaC4ikOF7mvyLdtV9UbYSEEwm",
  "consumerSecret": "i88vEK26GMs9aBiOn5pZV8gj6URF0ybdvFmYbmtDrqkRjnBBkF",
  "accessToken": "122897513-I7WAHD1WluMx9FVpQR38sousOHKL7ZBVMefsLeGx",
  "accessTokenSecret": "TeKUO3dgv7Rd4UvY4dvISYQT15zzldUcwCo018TCzqLGj",
  "port": "7890"
});
