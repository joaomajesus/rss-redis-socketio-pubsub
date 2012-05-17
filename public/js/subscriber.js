$(function(){
    var socket = io.connect();
    
    socket.on('article', onArticle);
});

function onArticle(data){
    
    var content = '<li class="article">'
    content += '<div class="title"><a href="' + data.link + '">' + data.title + '</a></div>';
    content += '<div class="author">' + data.author + '</div>';
    content += '<div class="published">' + data.published + '</div>';
    content += '<div class="content">' + data.content + '</div>';
    content += '</li>';
    
    $('#articles').prepend(content);
};