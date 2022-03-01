var $userList = document.querySelector('#user-list');
var requestObj = new XMLHttpRequest();
requestObj.open('GET', 'https://jsonplaceholder.typicode.com/users');
requestObj.responseType = 'json';
requestObj.addEventListener('load', requestFunction);

function requestFunction(e) {
  console.log(requestObj.status);
  console.log(requestObj.response);

  for (var i = 0; i < requestObj.response.length; i++) {
    var $elementLidocument = document.createElement('li');
    $elementLidocument.textContent = requestObj.response[i].name;
    $userList.appendChild($elementLidocument);

  }
}
requestObj.send();
