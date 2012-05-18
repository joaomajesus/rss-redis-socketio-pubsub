var redis = require('redis'),
    feed_poll = require("feed-poll"),
    poll, 
    express = require('express'),
    app = module.exports = express.createServer(),
    io = require('socket.io').listen(app),
    lastPublishedDate = null,
    redisClient,
    util = require('util');

// Configuration

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});


//Set up Redis, dynamically discovering and connecting to the bound CloudFoundry service
if (process.env.VCAP_SERVICES) {
    console.log("Bound services detected.");
    
    var services = JSON.parse(process.env.VCAP_SERVICES);

    for (var serviceType in services) {
    
        console.log("Service: " + serviceType);
        console.log("Service Info: " + JSON.stringify(services[serviceType]));
        
        if (serviceType.match(/redis*/)) {
            var service = services[serviceType][0];
            
            console.log("Connecting to Redis service " + service.name + ":" + service.credentials.hostname + ":" + service.credentials.port);
        
            redisClient = redis.createClient(service.credentials.port, service.credentials.hostname);
            redisClient.auth(service.credentials.password);
            
            break;
        }
    }
}

//Fall-back Redis connections for local development outside of CloudFoundry
if (!redisClient) {
    console.log("Connecting to local Redis service");
    redisClient = redis.createClient();
}

redisClient.on('error', function(error) {
    console.log(error);
});

// Routes

app.get('/', 'index.html');

app.get('/subscriber', 'subscriber.html');

app.post('/start', function(req, res) {
    
    poll = feed_poll([req.body.url], 15, function(error) {
        console.log(error);
    });

    //[ "http://feeds.feedburner.com/TechCrunch/", "https://github.com/blog.atom"]);

    poll.on('article', function(article) {
        
        if(lastPublishedDate != null && lastPublishedDate >= article.published)
            return;
        
        lastPublishedDate = article.published;
        
        article.content = null;
        
        redisClient.lpush('articles', JSON.stringify(article));
        redisClient.ltrim('articles', 0, 50);
        
        io.sockets.emit('article', article);
    });

    if(redisClient.llen('articles') > 0)
        redisClient.del('articles');
        
    lastPublishedDate = null;
    
    poll.start();

    res.redirect('back');
});

app.post('/stop', function(req, res) {
    if(poll)
        poll.stop();
        
    res.redirect('back');
});

app.listen(Number(process.env.PORT || process.env.VCAP_APP_PORT), function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

io.sockets.on('connection', function(socket) {
    
    if(redisClient.llen('articles') > 0)
        redisClient.lrange('articles', 0, 50, function(err, res) {
            if(res == null)
                return;
           
            for(var key in res)
                socket.emit('article', JSON.parse(res[key]));
                
        });
});