$(function(){
    $('#start').click(function(event){
        $.post('/start', {url: $('#url').val()})
    });
    
    $('#stop').click(function(event){
        $.post('/stop');
    });
});