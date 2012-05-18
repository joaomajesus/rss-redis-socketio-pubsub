$(function(){
    var socket = io.connect("http://rss-redis-socketio-pubsub.cloudfoundry.com", 80);
    
    socket.on('article', onArticle);
});

function onArticle(data){
    
    if(data == null)
        return;
    
    var content = '<li class="article">'
    //content += '<div class="title"><a href="' + data.link + '">' + data.title + '</a></div>';
    //content += '<div class="author">' + data.author + '</div>';
    //content += '<div class="published">' + data.published + '</div>';
    //content += '<div class="content">' + data.content + '</div>';
    
    content +=  data.published + ' - <a href="' + data.link + '">' + data.title + '</a>';
    
    content += '</li>';
    
    $('#articles').prepend(content);
};