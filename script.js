let h1     = document.querySelector ('#h1')
let div    = document.querySelector ('#div')
let button = document.querySelector ('#start')
var time   = document.querySelector("#time");
let quiz   = document.querySelector( '#quiz')
let result = document.querySelector('#result')
let final  = document.querySelector('#done')
let all  = document.querySelector('#all')
let secondsLeft = 60;
let secondsFinished =0;
let timerInterval;
let highscore;
let initial; 


h1.setAttribute("style", "margin:auto; width:50%; text-align:center;margin-bottom:2%");
div.setAttribute("style", "margin:auto; width:50%; text-align:center;font-size:bold");
button.setAttribute("style", "margin:auto; width:30%; text-align:center;");

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

let index=0
let choices=""
let correct =0
let opA   =""
let opB  =""
let opC  =""
let choice=""




button.addEventListener("click", function(){
  document.querySelector('.container').hidden=true;
  setTime();
  showquestion();

})

function setTime() {
    timerInterval = setInterval(function() {
    secondsLeft--;
    time.innerHTML = "View Highscores______ " + "Time :" + secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

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

  function showHighScore(){
     highscore    = "High Score";
     initial   = document.getElementById("initial").value;
    final.innerHTML="";
    result.innerHTML="";
    all.innerHTML= "<h3>"+highscore+"</h3>";
    //highscorecon= secondsFinished.toString()+" " +initial;
    //console.log(secondsFinished);

    all.innerHTML+= "<label id = 'fscore'>"+ "1 - " + initial + " " + secondsFinished+"</label><br><br>";
    all.innerHTML += "<button onclick='goBack()' 'style = margin:10px'>Go Back</button>  ";
    all.innerHTML += "<button onclick='clearHighScore()'>Clear High Score</button>  ";
    document.getElementById("fscore").style.border = "thick solid #0000FF";
  }
  function goBack(){
    all.innerHTML= "";
    setTime();
    showquestion();
  }
  function clearHighScore(){
   //all.innerHTML= "<h3>"+highscore+"</h3>";
   document.getElementById("fscore").value=""
  // document.getElementById("txtinl").value="";
  // //document.getElementById("txtscore").value="";

  }