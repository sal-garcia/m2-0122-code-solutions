function hello() {
  var $header = document.querySelector('h1');
  $header.textContent = 'Hello There';

}

setTimeout(hello, 2000);
