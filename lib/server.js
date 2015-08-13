"use strict";


var connect = require('connect')
var http = require('http')
var path = require('path')

var app = connect()

// gzip/deflate outgoing responses
var compression = require('compression')
app.use(compression())

// store session state in browser cookie
var cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}))

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

var createStatic = require('connect-static');
 
// These are all defaults. If you leave any options out, this is what they 
// will be. 
var options = {
  dir: "web",
  aliases: [
    ['/', '/index.html'],
  ],
  ignoreFile: function(fullPath) {
    var basename = path.basename(fullPath);
    return /^\./.test(basename) || /~$/.test(basename);
  },
  followSymlinks: true,
  cacheControlHeader: "max-age=0, must-revalidate",
};
createStatic(options, function(err, middleware) {
  if (err) throw err;
  app.use('/', middleware);
});

//create node.js http server and listen on port
http.createServer(app).listen(3000)