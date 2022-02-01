// getElementsByClassName returns an array of elements
var index = 0;
var $images = document.getElementsByClassName('images');
var $blackCircle = document.getElementsByClassName('circle');
function cycleImg() {
  for (var i = 0; i < $images.length; i++) {
    $images[i].classList.add('hidden');
    $blackCircle[i].classList.replace('fas', 'far');//
  }
  if (index === 5) {
    index = 0;
  }
  if (index === -1) {
    index = 4;
  }
  $images[index].classList.remove('hidden');// removes changes from the index
  $blackCircle[index].classList.replace('far', 'fas');// index changes everytime it gets incremented
}

cycleImg();

var recycled = function (e) { // will increment index and run the cycleImg func
  index++;
  cycleImg();
};

var timer = setInterval( // sets the timer for the function recycled func to run every 3 seconds automatically
  recycled, 3000);

function restart() {
  clearInterval(timer);// it cancels the time repeating action
  timer = setInterval( // repopulates meaning into timer and then it clears it over and over(each time an arrow is clicked)
    recycled, 3000);
}

var $rightArrow = document.querySelector('.fa-angle-right');

$rightArrow.addEventListener('click', function (event) { // right arrow functionality
  index++;
  cycleImg();
  restart();
});

var leftArrow = document.querySelector('.fa-angle-left');

leftArrow.addEventListener('click', function (event) { // left arrow functionality
  index--;
  cycleImg();
  restart();
});

// clicking on black circle functionality
for (let j = 0; j < $blackCircle.length; j++) {
  $blackCircle[j].addEventListener('click', function () {
    index = j;// why let?, because that locks the value of index into this code block making sure
    cycleImg();// none of the other index values are affected
    restart();
  });
}
