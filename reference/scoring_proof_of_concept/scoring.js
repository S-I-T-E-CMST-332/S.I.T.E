"use strict";
    var output = document.getElementById("output");
    var answers = document.getElementById("answers");
    var images = ["first", "second", "third", "fourth", "fifth", "sixth", "last one"];
    var image = -1;
    var button = "text";
    
    var total = 0;
    var right = 0;
    var part = 0;
    var wrong = 0;
    
    var totalCount = document.getElementById("totalCount");
    var rightScore = document.getElementById("rightScore");
    var partScore = document.getElementById("partScore");
    var wrongScore = document.getElementById("wrongScore");
    
    changeImage();  // start the test
    
    function checkAnswer (button) {
      switch(button) {
        case 'correct':
          right++;
          total++;
          changeImage();
          break;
        case 'partial':
          part++;
          total++;
          changeImage();
          break;
        case 'incorrect':
          wrong++;
          total++;
          changeImage();
          break;
      }
      
      if (image == images.length) {
        endTest();
      }
    }
    
    function changeImage () {
      image++;
      output.innerHTML = images[image];
    }
    
    function endTest() {
      output.innerHTML = "Test Over";
      answers.innerHTML = "";
      totalCount.innerHTML = "Answered: " + total;
      rightScore.innerHTML = "Correct: " + right;
      partScore.innerHTML = "Partial: " + part;
      wrongScore.innerHTML = "Incorrect: " + wrong;
    }