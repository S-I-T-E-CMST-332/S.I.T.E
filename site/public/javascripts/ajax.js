let xhttp = new XMLHttpRequest();
let image = document.getElementById("image");
let correct = document.getElementById("correct");
let incorrect = document.getElementById("incorrect");
let kindOf = document.getElementById("kindOf");

correct.addEventListener('click', function(e){
    e.preventDefault();
    xhttp.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
            image.src = this.responseText;
        }else{
            console.log("Loading? (correct)");
        }
    }
    xhttp.open('POST', '/correct');
    xhttp.send();
});
incorrect.addEventListener('click', function(e){
    e.preventDefault();
    xhttp.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
            image.src = this.responseText;
        }else{
            console.log("loading? (incorrect)");
        }
    }
    xhttp.open('POST', '/incorrect');
    xhttp.send();
});
kindOf.addEventListener('click', function(e){
    e.preventDefault();
    xhttp.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
            image.src = this.responseText;
        }else{
            console.log("Loading? (kind of");
        }
    }
    xhttp.open('POST', '/kindof');
    xhttp.send();
});