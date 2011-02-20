var stickies = [];
$('.sticky').each(function(i, sticky){ 
  var $sticky = $(sticky);   
  stickies.push({
      'top':$sticky.position().top,
      'left':$sticky.position().left, 
      'text':$sticky.text()
  }) 
})

localStorage.stickies = JSON.stringify(stickies, null, 2);

stickies2 = JSON.parse(localStorage.stickies)

var s = stickies2[0];
console.log(s);
$('<div>', {
  'class': 'sticky',
  'top' : s.top,
  'left' : s.left,
  'text' : s.text,
  'css': 'background-color:green'
}).appendTo('body');

$('.sticky').draggable();
