var redis = require("redis"),
    feed_poll = require("feed-poll"),
    poll,
    express = require('express'),
    app = module.exports = express.createServer(),
    io = require('socket.io').listen(app);
    
// Configuration

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', 'index.html');

app.get('/subscriber', 'subscriber.html');

app.post('/start', function(req, res){
    poll = feed_poll([req.body.url], 30, function(error){console.log(error)})
    
    //[ "http://feeds.feedburner.com/TechCrunch/", "https://github.com/blog.atom"]);

    poll.on("article", function(article) {
        io.sockets.emit('article', article);
    });
    
    poll.start();

    res.redirect('back');
});

app.post('/stop', function(req, res){
    poll.stop();
    res.redirect('back');
});

app.listen(Number(process.env.PORT || process.env.VCAP_APP_PORT), function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

//io.sockets.on('connection', function (socket) {
  
//});
