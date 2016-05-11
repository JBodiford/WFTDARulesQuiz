
//quiz.js
function Quiz(questions){
	this.score = 0;
	this.questions = questions;
	this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer){
	if(this.getCurrentQuestion().isCorrectAnswer(answer)){ 
		this.score++;
        QuizUI.displayAnswer();
	}
	this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function(){
	return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function(){
	return this.currentQuestionIndex >= this.questions.length;
};

//question.js
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};


//QuizUI.js

var QuizUI = {
    displayNext: function () {
        var nextButton = document.getElementById("next").style.visibility = "hidden";

        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
        	this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
            if(choices.length <= 2){
                   document.getElementById("choice2").style.visibility = "hidden";
                   document.getElementById("choice3").style.visibility = "hidden";
                   document.getElementById("guess2").style.visibility = "hidden";
                   document.getElementById("guess3").style.visibility = "hidden";
                }
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess, answer) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayAnswer();
            QuizUI.displayNext();
        }
    },

    nextHandler: function(){
        var nextButton =document.getElementById("next").style.visibility = "visible";
        nextButton.onclick = function(){
            //QuizUI.displayAnswer();
        QuizUI.displayNext();
        }
    },
    
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    },

    displayAnswer: function() {
		 this.populateIdWithHTML("answer", "The answer: " + quiz.getCurrentQuestion().answer);
    },
}; //end of var QuizUI

//app.js
var questions = [
	new Question("IF A BLOCKER LINES UP WITH ANY PART OF THEIR SKATE TOUCHING THE GROUND BEHIND THE JAMMER LINE AFTER THE JAM-STARTING WHISTLE, THE BLOCKER:", 
		["A. Earns a False Start and must serve 30 seconds in the Penalty Box.",
		 "B. Must skate clockwise until the Blocker has yielded to at least one Blocker from the opposing team.",
		 "C. Can engage other Skaters immediately. Touching over the Jammer Line is considered No Impact/No Penalty.",
		 "D. Must yield to all Skaters in proximity, including opposing Jammer, to avoid a False Start penalty."],
		"D. Must yield to all Skaters in proximity, including opposing Jammer, to avoid a False Start penalty."),
	new Question("TRUE OR FALSE: TEAM A’S JAMMER IS NOT ON THE TRACK PRIOR TO THE JAM-STARTING WHISTLE. TEAM A IS ALLOWED TO SEND A JAMMER FROM ITS BENCH ONTO THE TRACK TO PLAY IN THE IN-PROGRESS JAM.", 
		["A. True",
		 "B. False"],
		 "B. False"),
	new Question("TRUE OR FALSE: SKATERS MAY LEGALLY RE-ENTER THE TRACK IN FRONT OF THE OPPONENT WHO FORCED THEM OUT OF BOUNDS, IF THE OPPONENT WENT OUT OF BOUNDS AT ANY POINT AFTER THE INITIATING BLOCK.",
		["A. True", 
		 "B. False"],
		 "A. True")
];

//Creates Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();

//not the question
//tried the order of the file calls