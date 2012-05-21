rss-redis-socketio-pubsub
=========================

This is a technology sample I'm using to experiment with some of the recent frameworks on the web stack.  
Namely, Node.js, Socket.io and Redis

I've used the Cloud9 IDE, a free online IDE with GitHub integration, to edit, debug and deploy this app to Cloud Foundry, a free open source PaaS provider.

This app pools a RSS feed, stores the articles on Redis and pushes them to web client subscribers using Socket.io.

The default page (index.html) has a textbox to enter the RSS feed and a start and stop buttons.  
The subscriber.html page just shows a simple list of articles with the time and title/link. 

##References

####Node.js

[Node.js](http://nodejs.org)  
[Node.js Guide](http://nodemanual.org/latest/nodejs_dev_guide/)  
[docs.nodejitsu.com](http://docs.nodejitsu.com/)  
[The Node Beginner Book » A comprehensive Node.js tutorial](http://www.nodebeginner.org/)  
[feed-poll](https://github.com/sentientwaffle/feed-poll)  
[Express - node web framework](http://expressjs.com/)

####Socket.io

[Socket.IO - the cross-browser WebSocket for realtime apps](http://socket.io/)  
[Websockets everywhere with Socket.IO - How To Node - NodeJS](http://howtonode.org/websockets-socketio)  
[socket.io at GitHub](https://github.com/LearnBoost/socket.io)  
[Configuring Socket.IO • LearnBoost-socket.io Wiki](https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO)

####Redis

[Redis](http://redis.io/)  
[Command reference – Redis](http://redis.io/commands)  
[The Little Redis Book](http://openmymind.net/2012/1/23/The-Little-Redis-Book/)  
[node_redis](https://github.com/mranney/node_redis)

####Cloud9 IDE

[Cloud9 IDE - Online IDE – Your code anywhere, anytime](http://c9.io/)  
[Support - FAQ – How can we help you today- - Cloud9 IDE - Online IDE – Your code anywhere, anytime](http://c9.io/site/category/faq/)

####GitHub

[GitHub](https://github.com/)  
[Help.GitHub – Welcome](http://help.github.com/)

####Cloud Foundry

[Cloud Foundry](http://www.cloudfoundry.com/)  
[Cloud Foundry Node.js](http://docs.cloudfoundry.com/frameworks/nodejs/nodejs.html)  
[Simplified Application Deployment With Cloud Foundry “Manifest” Blog](http://blog.cloudfoundry.com/post/13481010498/simplified-application-deployment-with-cloud-foundry-manifest)  
[cloudfoundry-samplesnode-spring-flex-chatnodechat-redisnode-chat.js at master • SpringSourcecloudfoundry-samples](https://github.com/SpringSource/cloudfoundry-samples/blob/master/node-spring-flex-chat/nodechat-redis/node-chat.js#L33)