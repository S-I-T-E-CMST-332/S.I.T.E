let xhttp = new XMLHttpRequest();
let correct = document.getElementById("correct");
let incorrect = document.getElementById("incorrect");
let kindOf = document.getElementById("kindOf");

correct.addEventListener('click', function(){
    xhttp.open('POST', '/correct');
    xhttp.send();
});
incorrect.addEventListener('click', function(){
    xhttp.open('POST', '/incorrect');
    xhttp.send();
});
kindOf.addEventListener('click', function(){
    xhttp.open('POST', '/kindof');
    xhttp.send();
});