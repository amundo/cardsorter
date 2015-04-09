window.Cards = {};

$(document).ready(function(){


  Cards.readStickies  = function (){
    if(localStorage.stickies){
      return JSON.parse(localStorage.stickies);   
    }
  }


  var stickies = Cards.readStickies();

  $.each(stickies, function(i,sticky){
    $('<div>', {
      'css': {'position': 'absolute', 'top': sticky.top, 'left': sticky.left} ,
      'class': 'sticky',
      'text': sticky.text
    })
    .appendTo('#board')
  })

  $('.sticky').draggable();

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
          'left': $('#board').position()['left'] + Math.floor(Math.random() * $('#board').width()) * .6 + 'px',
          'top': $('#board').position()['top'] + Math.floor(Math.random() * $('#board').height()) * .6 + 'px',
          'position': 'absolute' 
        })
        .appendTo($('#board'));

        $('input').val('').focus();

        $('.sticky').draggable();

        $('#save').click();

    }

  });


  $( "div.sticky" ).live('dblclick', function(){ 
    $(this).addClass('hidden') ;
    $('.sticky').draggable({ });
  } );


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

 
  
    Cards.saveStickies();
  })


  Cards.saveStickies  = function(){
    localStorage.stickies = JSON.stringify(stickies);
    $('#status').text('saved!').fadeOut(1600, function(){ 
      $('#status').text('').show();
    })
  };

  function byPosition(a,b){

    var ay = parseFloat(a['top']),
        ax = parseFloat(a['left']),
        by = parseFloat(b['top']),
        bx = parseFloat(b['left']);

    if (ay == by) {
      return ax - bx ;
    } else { 
      return ay - by ;
    }

  }

  $('#export').click(function(ev){

     var stickies = Cards.readStickies();

     stickies.sort(byPosition);

     Cards.saveStickies();

     $('#save').click();

     $('body').html('');
     $.each(stickies, function(i, sticky){
       $('body').append('<p>' + sticky.text + '</p>');
     })

  })

  setInterval(function(){
    Cards.saveStickies();
    console.log(Cards);
  }, 15 *  1000);

})

