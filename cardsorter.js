$(document).ready(function(){

  if(localStorage.stickies){
    var stickies = JSON.parse(localStorage.stickies);   
    $.each(stickies, function(i,sticky){
      $('<div>', {
        'css': {'position': 'absolute', 'top': sticky.top, 'left': sticky.left} ,
        'class': 'sticky',
        'text': sticky.text
      }).appendTo('#board')
    })
  }

  $('.sticky').draggable().selectable();

  $('p#help_content').hide(); 

  $('input').focus();

  $('#toggle_help').toggle(
   function(){ $('#help_content').show(); $('#toggle_help').html('close help'); },
   function(){ $('#help_content').hide(); $('#toggle_help').html('show help'); }
  )

  $('input').keyup(function(ev){

    if( ev.which == 13 && $('input').val().length > 0){
        $('<div></div>', {
          'text': $.trim($('input').val()),
          'class': 'sticky'
        })
        .css({
          'left': Math.floor(Math.random() * $('#board').width()) * .6 + 'px',
          'top': Math.floor(Math.random() * $('#board').height()) * .6 + 'px',
          'position': 'absolute' 
        })
        .appendTo($('#board'));

        $('input').val('').focus();

        $('.sticky').draggable({ });

    }

  });


  $( "div.sticky" ).live('dblclick', function(){ 
    $(this).addClass('hidden') ;
    $('.sticky').draggable({ });
  } ) ;


  $('#save').live('click', function(){ 
    var stickies = []; 
    $.each($('div.sticky').not('.hidden'), function(i, sticky) { 
      stickies.push({  
        'top': $(this).css('top'),
        'left': $(this).css('left'),
        'position': $(this).css('position'),
        'text': $(this).text(),
      }) 
    })  
  
    localStorage.stickies = JSON.stringify(stickies);
  })




})

