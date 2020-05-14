let xhttp = new XMLHttpRequest();
let image = document.getElementById("image");
let correct = document.getElementById("correct");
let incorrect = document.getElementById("incorrect");
let kindOf = document.getElementById("kindOf");

correct.addEventListener('click', function(e){
    e.preventDefault();
    xhttp.open('POST', '/correct');
    xhttp.onload = function(){
        image.src = this.responseText;
    }
    xhttp.send();
});
incorrect.addEventListener('click', function(e){
    e.preventDefault();
    xhttp.open('POST', '/incorrect');
    xhttp.onload = function(){
        image.src = this.responseText;
    }
    xhttp.send();
});
kindOf.addEventListener('click', function(e){
    e.preventDefault();
    xhttp.open('POST', '/kindof');
    xhttp.onload = function(){
        image.src = this.responseText;
    }
    xhttp.send();
});