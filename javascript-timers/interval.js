var number = 4;
var interval = setInterval(function () {
  var $count = document.querySelector('.countdown-display');
  if (number === 0) {
    $count.textContent = 'Earth Beeeelooowww Us~';
    clearInterval(interval);
  } else {
    number--;
    $count.textContent = number;
  }
}, 1000);
