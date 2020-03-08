
/* variables to receive the elements tags from the page */
let h1     = document.querySelector ('#h1')
let div    = document.querySelector ('#div')
let button = document.querySelector ('#start')
var time   = document.querySelector("#time");
let quiz   = document.querySelector( '#quiz')
let result = document.querySelector('#result')
let final  = document.querySelector('#done')
let all    = document.querySelector('#all')

/* variables data manipulation */
let secondsLeft = 60;
let secondsFinished =0;
let timerInterval;
let highscore;
let initial; 

/* apply style for the header, division and button */
h1.setAttribute("style", "margin:auto; width:50%; text-align:center;margin-bottom:2%");
div.setAttribute("style", "margin:auto; width:50%; text-align:center;font-size:bold");
button.setAttribute("style", "margin:auto; width:30%; text-align:center;");

/* Object to store question, choice and answer */
let questions = [
  {
    'question': "What does HTML stand for?",
    'choices': ["Hyperlink Test Markup Language","Home Tool Markup Language", "Hyper text Markup Language"],
    'answer': '2'
  },
  {
    'question': "Which event occurs when the user clicks on an HTML element?",
    'choices' : ["onclick", "onchange", "onmouseclick" ],
    'answer'  : '0'

   },
  { 
    'question': "How do you create a function in JavaScript?",
    'choices' : ["function = myFunction()", "function:myFunction()", "function myFunction()" ],
    'answer'  : '2'

  },
  {
    'question': "The Bootstrap grid system is based on how many columns?",
    'choices' : ["6", "12", "5", ],
    'answer'  : '1'
  }
]

/* variables for data manipulation */
let index=0
let choices=""
let correct =0
let opA   =""
let opB  =""
let opC  =""
let choice=""



/* Initial start quiz button click event will display the question and choices */
button.addEventListener("click", function(){
  document.querySelector('.container').hidden=true;
  setTime();
  showquestion();

})

/* Set the timer for the question and choices */
function setTime() {
    timerInterval = setInterval(function() {
    secondsLeft--;
    time.innerHTML = "View Highscores______ " + "Time :" + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      alert("Times Up !!!")
      quiz.hidden=true
      final.innerHTML="<h3><p>ALL DONE</p></h3>";
    }

  }, 1000);
}

/* show the questions and choices */
function showquestion(){
   if (index >=questions.length){

       quiz.innerHTML="";
       secondsFinished=secondsLeft;
       clearInterval(timerInterval);
       time.innerHTML="";
       //final.innerHTML="<p>"+secondsFinished+"</p>";  
       final.innerHTML+="<h3><p>ALL DONE</p></h3>";
       final.innerHTML+="<p>"+"Your score is :"+secondsFinished+"</p>";
       final.innerHTML+="Enter Initial: ";
       final.innerHTML+="<input type='text' id ='initial'> ";
       final.innerHTML += "<button onclick='showHighScore()'>Submit</button><hr>";
       index = 0;
       correct = 0;       
       return false;
      
       
       
   }

  question = questions[index]['question'];
  opA = questions[index]['choices'][0];
  opB = questions[index]['choices'][1]; 
  opC = questions[index]['choices'][2];
  quiz.innerHTML = "<h3>"+question+"</h3>";
  quiz.innerHTML += "<input type='radio' name='choices' value='0'> "+opA+"<br>";
  quiz.innerHTML += "<input type='radio' name='choices' value='1'> "+opB+"<br>";
  quiz.innerHTML += "<input type='radio' name='choices' value='2'> "+opC+"<br><br>";
  quiz.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button> <hr>";


}

/* check the answer and display the result and show the next question */
function checkAnswer(){
    choices = document.getElementsByName("choices");

    for(let i=0; i<choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
        console.log (choices)
      }
    }

    if(choice === questions[index]['answer']){
    result.innerHTML="Correct";
     correct++;
   }
   else{
     result.innerHTML="Wrong";
     secondsLeft=secondsLeft-5;

   }
    index++;
   
    showquestion();
  }



  /* show the score */
  function showHighScore(){
    highscore    = "High Score";
    initial   = document.getElementById("initial").value;
    final.innerHTML="";
    result.innerHTML="";
    all.innerHTML= "<h3>"+highscore+"</h3>"; 
    all.innerHTML+="<input type='text' id ='txtinl'> ";
    all.innerHTML+="<input type='text' id ='txtscore'> <br><br>";
    all.innerHTML += "<button onclick='goBack()' 'style = margin:10px'>Go Back</button>  ";
    all.innerHTML += "<button onclick='clearHighScore()'>Clear High Score</button>  ";
    document.getElementById("txtinl").value=initial;
    document.getElementById("txtscore").value=secondsFinished;
    let score = {
      signedInitial: initial,
      score: secondsFinished
    }
    localStorage.setItem("score", JSON.stringify(score));
    let lastScore = JSON.parse(localStorage.getItem("score"));
    console.log(lastScore);



  }

  /* go back to the show question again */
  function goBack(){
    all.innerHTML= "";
    // setTime();
    // showquestion();
    location.reload();
  }

  /* clear the answers */
  function clearHighScore(){
   document.getElementById("txtinl").value="";
   document.getElementById("txtscore").value="";
   


 }