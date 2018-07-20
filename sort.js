key = {};
function test_key(selkey){
  var alias = {
    "ctrl":  17,
    "cmd":  91,
    "shift": 16,
    "O": 79,
  };

  return key[selkey] || key[alias[selkey]];
}

function test_keys(){
  var keylist = arguments;

  for(var i = 0; i < keylist.length; i++)
    if(!test_key(keylist[i]))
      return false;

  return true;
}

function sortComments() {
  var comments = document.querySelectorAll('.js-timeline-item');
  var result = []

  for (var i = 0; i < comments.length; i++) {
    var emoji = comments[i].querySelector('.btn-link.reaction-summary-item');

    result.push({
      element: comments[i],
      count: parseInt(emoji && emoji.innerHTML.replace(/[\n\s]+\<.*\>[\n\s]+/,'').replace(/\s+/, ''))
    })
  }

  result.sort(function(a, b) {
    if (isNaN(a.count) || a.count < b.count) {
      return 1;
    }
    if ( isNaN(b.count) || a.count > b.count) {
      return -1;
    }
    return 0;
  })

  var container = document.querySelector('.js-discussion.js-socket-channel');
  while (container.childNodes.length > 2) {
    container.removeChild(container.lastChild);
  }
  for (var i = 0; i < result.length; i++) {
    container.appendChild(result[i].element)
  }
}

window.onkeydown = window.onkeyup = function(e){
  key[e.keyCode] = e.type == 'keydown';
  if(test_keys('cmd', 'shift', 'O') || test_keys('ctrl', 'shift', 'O')) {
    sortComments();
  }
};

