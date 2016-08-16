
//quiz.js
function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer){
    if(this.getCurrentQuestion().isCorrectAnswer(answer)){ 
        this.score++;
        QuizUI.rightAnswer();
    } else {
    QuizUI.displayAnswer();
    }
    QuizUI.disableChoices();
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
        var nextButton = document.getElementById("next");
        nextButton.style.display = "none";

        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.clearAnswer();
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
            this.enableChoices();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;
        for(var i = 0; i < 5; i++) {
            if(i < choices.length) {
                this.populateIdWithHTML("choice" + i, choices[i]);
                this.guessHandler("guess" + i, choices[i]);
                document.getElementById("choice" + i).style.display = "";
                document.getElementById("guess" + i).style.display = "";
            } else {
                 document.getElementById("choice" + i).style.display = "none";
                 document.getElementById("guess" + i).style.display = "none";
            }
        }
    },


    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + " of " + quiz.questions.length +"</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },

    guessHandler: function(id, guess, answer) {
        var guessButton = document.getElementById(id);
        guessButton.onclick = function(event) {
            quiz.guess(guess);
            QuizUI.nextHandler();
        }
    },

    nextHandler: function(){
        var nextButton = document.getElementById("next");
        nextButton.style.display = "block";
        nextButton.onclick = function() {
            QuizUI.displayNext();
        }
    },

    disableChoices: function(){
        var disableOnClick = document.getElementsByClassName("btn--default");
        for(var i = 0; i < disableOnClick.length; i++) {
        disableOnClick[i].disabled = true;
        }
    },

    enableChoices: function(){
        var enableOnClick = document.getElementsByClassName("btn--default");
        for(var i = 0; i < enableOnClick.length; i++) {
        enableOnClick[i].disabled = false;
        }
    },
    
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    },

    displayAnswer: function() {
         this.populateIdWithHTML("answer", "The answer: " + quiz.getCurrentQuestion().answer);
    },

    rightAnswer: function() {
         this.populateIdWithHTML("answer", "Correct Answer!");
    },

    clearAnswer: function(){
        this.populateIdWithHTML("answer", "");
    }
}; //end of var QuizUI

//app.js
var questions = [
    new Question("1. TRUE OR FALSE: TEAM A’S JAMMER IS NOT ON THE TRACK PRIOR TO THE JAM-STARTING WHISTLE. TEAM A IS ALLOWED TO SEND A JAMMER FROM ITS BENCH ONTO THE TRACK TO PLAY IN THE IN-PROGRESS JAM.", 
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("2. TRUE OR FALSE: SKATERS MAY LEGALLY RE-ENTER THE TRACK IN FRONT OF THE OPPONENT WHO FORCED THEM OUT OF BOUNDS, IF THE OPPONENT WENT OUT OF BOUNDS AT ANY POINT AFTER THE INITIATING BLOCK.",
        ["A. True", 
         "B. False"],
         "A. True"),
    new Question("3. TRUE OR FALSE: A CUTTING THE TRACK PENALTY WILL BE ISSUED FOR A SKATER WHO SLIDES OUT OF BOUNDS AND THEN BACK IN BOUNDS WHILE STILL DOWN.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("4. IF A BLOCKER LINES UP WITH ANY PART OF THEIR SKATE TOUCHING THE GROUND BEHIND THE JAMMER LINE AFTER THE JAM-STARTING WHISTLE, THE BLOCKER:", 
        ["A. Earns a False Start and must serve 30 seconds in the Penalty Box.",
         "B. Must skate clockwise until the Blocker has yielded to at least one Blocker from the opposing team.",
         "C. Can engage other Skaters immediately. Touching over the Jammer Line is considered No Impact/No Penalty.",
         "D. Must yield to all Skaters in proximity, including opposing Jammer, to avoid a False Start penalty."],
         "D. Must yield to all Skaters in proximity, including opposing Jammer, to avoid a False Start penalty."),
    new Question("5. WHICH PART OF THE BODY IS CONSIDERED AN ILLEGAL TARGET ZONE?",
        ["A. Chest",
         "B. Upper arm",
         "C. Hip",
         "D. Above the shoulder"],
         "D. Above the shoulder"),
    new Question("6. HOW MANY TIMEOUTS DOES EACH TEAM HAVE PER GAME?",
        ["A. One",
         "B. Two",
         "C. Three",
         "D. Four"],
         "C. Three" ),
    new Question("7. WHICH OF THE FOLLOWING MUST A SKATER DO WHEN RE-ENTERING THE TRACK FROMTHE PENALTY BOX?",
        ["A. Re-enter at the front of the pack",
         "B. Skate onto the track immediately, regardless of the location of the pack",
         "C. Re-enter behind all in-play Blockers",
         "D. None of the above"],
         "C. Re-enter behind all in-play Blockers"),
    new Question("8. WHICH OF THE FOLLOWING IS A PENALTY?",
        ["A. Failure to Yield",
         "B. Too Many Skaters on the Track",
         "C. Improper Uniform",
         "D. Removing Required Safety Equipment",
         "E. All of the Above"],
         "E. All of the Above"),
    new Question("9. TRUE OR FALSE: WHEN INITIATING A BLOCK, A SKATER MUST BE IN BOUNDS BUT MAY PICK UP MOMENTUM FOR THE BLOCK FROM OUT OF BOUNDS PRIOR TO RETURNING TO THE TRACK.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("10. TRUE OR FALSE: USING AN IMPENETRABLE WALL TO IMPEDE AN OPPONENT IS ILLEGAL.",
        ["A. True",
         "B. False"],
         "A. True"),
    new Question("11. WHEN IS A JAMMER CONSIDERED PART OF THE PACK?",
        ["A. When the Jammer is within 20 feet (6 meters) of the pack (in play)",
         "B. When the Jammer is within 10 feet (3 meters) of the nearest pack Skater (in proximity)",
         "C. Never",
         "D. When the Jammer is in the pack, helping their Blocker with defense"],
         "C. Never"),
    new Question("12. TRUE OR FALSE: A SKATER WHO IS LEAD JAMMER CAN CALL OFF THE JAM WHILE BEING REMOVED FROM PLAY DUE TO A PENALTY.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("13. WHAT IS THE MAXIMUM NUMBER OF SKATERS FROM ONE TEAM THAT CAN BE SEATED IN THE PENALTY BOX AT ONE TIME?",
        ["A. Three",
         "B. Four",
         "C. Five",
         "D. Two"],
         "A. Three"),
    new Question("14. WHAT HAPPENS WHEN A JAMMER WHO HAS NOT BEEN DECLARED LEAD JAMMER SUCCESSFULLY CALLS OFF THE JAM?",
        ["A. The Jammer receives an Illegal Procedure penalty",
         "B. The Captain receives an Insubordination penalty",
         "C. Nothing"],
         "A. The Jammer receives an Illegal Procedure penalty"),
    new Question("15. WHAT IS THE REFEREE WHISTLE SIGNAL FOR A PENALTY?",
        ["A. No whistle signal",
         "B. Two rapid whistle blasts",
         "C. One long whistle blast",
         "D. Two long whistle blasts"],
         "C. One long whistle blast"),
    new Question("16. AT MOST, HOW MANY SECONDS CAN ELAPSE AFTER THE COMPLETION OF A TIMEOUT, BARRING ADDITIONAL TIMEOUTS BEFORE THE NEXT JAM BEGINS?",
        ["A. 15",
         "B. 20",
         "C. 30",
         "D. 60"],
         "C. 30"),
    new Question("17. TRUE OR FALSE: A JAMMER MUST STAY IN BOUNDS TO REMAIN LEAD JAMMER.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("18. HELMET COVERS MAY BE RETRIEVED WHILE SKATING IN WHICH DIRECTION?",
        ["A. Clockwise",
         "B. Counterclockwise",
         "C. Neither",
         "D. A and B"],
         "D. A and B"),
    new Question("19. WHAT IS THE RESULT OF THE FOLLOWING SCENARIO? A DOWNED SKATER RE-ENTERS THE TRACK AND CAUSES AN OPPOSING SKATER TO STUMBLE BUT NOT FALL OR LOSE RELATIVE POSITION.",
        ["A. No Impact/No Penalty",
         "B. Penalty",
         "C. Expulsion"],
         "A. No Impact/No Penalty"),
    new Question("20. TRUE OR FALSE: WHEN A JAMMER’S HELMET COVER FALLS TO THE GROUND, THE PIVOT CAN PICK IT UP TO BECOME THE ACTIVE JAMMER.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("21. A LEGAL STAR PASS IS COMPLETED:",
        ["A. When the helmet cover leaves the Jammer’s helmet.",
         "B. When the Jammer hands the helmet cover to the Pivot and the Pivot is in full possession.",
         "C. After the Jammer passes or tosses the helmet cover to the Pivot and it is in the Pivot’s hand, or when the Pivot picks up the Jammer helmet cover from the floor and puts it on their helmet.",
         "D. When the Pivot is in possession of the Jammer helmet cover, in their hand or on their helmet, regardless of how it was transferred.",
         "E. When the helmet cover is on the former Pivot’s helmet with the stars visible."],
         "B. When the Jammer hands the helmet cover to the Pivot and the Pivot is in full possession."),
    new Question("22. TRUE OR FALSE: A SKATER, HAVING GONE OUT OF BOUNDS OR STRADDLING, WHO BRIEFLY AND UNINTENTIONALLY COMPLETELY RETURNS TO THE TRACK ON ONE SKATE IN THEIR EFFORTS TO REMAIN OR RETURN OUT OFBOUNDS IS ISSUED A CUTTING THE TRACK PENALTY.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("23. AN AIRBORNE JAMMER JUMPING THE APEX HITS AN OPPONENT’S ARM THAT IS EXTENDED OVER THE INSIDE LINE. THE CONTACT CAUSES THE JAMMER TO FALL, AND THE OPPOSING SKATER STAYS IN BOUNDS AND UPRIGHT. WHAT PENALTIES, IF ANY, SHOULD BE ISSUED BY OFFICIALS?",
        ["A. The Jammer gets a penalty for initiating contact with both skates off the ground.",
         "B. The Blocker gets a penalty for blocking out of bounds.",
         "C. No penalty should be issued for either Skater - the illegal action was No Impact/No Penalty.",
         "D. Both Skaters receive penalties."],
         "C. No penalty should be issued for either Skater - the illegal action was No Impact/No Penalty."),
    new Question("24. TRUE OR FALSE: IF A SKATER IS ILLEGALLY BLOCKED OUTSIDE OF THE ENGAGEMENT ZONE, THEY MAY LEGALLY COUNTER-BLOCK.",
        ["A. True",
         "B. False"],
         "A. True"),
    new Question("25. A REFEREE MUST GIVE YOU A WARNING BEFORE ISSUING WHICH TYPES OF PENALTIES:",
        ["A. Failure to Return",
         "B. Multi-Player Block",
         "C. Use of Hands",
         "D. None of the above"],
        "A. Failure to Return"),
    new Question("26. WHAT KIND OF PENALTY WOULD BE ISSUED IN THE FOLLOWING SCENARIO? AN UPRIGHT SKATER RE-ENTERS THE TRACK FROM OUT OF BOUNDS IN FRONT OF MULTIPLE IN-BOUNDS SKATERS DURING A NO PACK SCENARIO, RESULTING IN HAVING BETTERED THEIR POSITION.",
        ["A. Illegal Procedure",
         "B. Cutting the Track",
         "C. No Impact/No Penalty",
         "D. Thumbs Up"],
         "B. Cutting the Track" ),
    new Question("27. TRUE OR FALSE: IF A TEAM REQUESTS THEIR FIRST OFFICIAL REVIEW OF THE PERIOD AND IT IS DETERMINED AN OFFICIATING ERROR WAS MADE BASED ON THE SUBJECT OF THE REVIEW, THE TEAM WILL RETAIN THEIR OFFICIAL REVIEW.",
        ["A. True",
         "B. False"],
         "A. True"),
    new Question("28. WHICH REFEREES ARE ALLOWED TO EXPEL A SKATER?",
        ["A. Any of the Referee staff",
         "B. Only the Jammer Referees",
         "C. Only the Head Referee",
         "D. The Jammer Referees and the Head Referee"],
         "C. Only the Head Referee"),
    new Question("29. IF AN OFFICIAL IS NOT SURE WHETHER AN ACTION WARRANTS A PENALTY OR EXPULSION, IT MUST BE CALLED AS:",
        ["A. No Impact/No Penalty",
         "B. Penalty",
         "C. Expulsion"],
         "B. Penalty"), 
    new Question("30. WHICH OF THE FOLLOWING SAFETY GEAR MAY BE REMOVED WHEN SEATED IN THE PENALTY BOX?",
        ["A. Helmet",
         "B. Mouth guard",
         "C. Both A and B",
         "D. None of the above"],
         "B. Mouth guard"),
    new Question("31. TRUE OR FALSE: A PENALIZED SKATER’S TEAMMATES, MANAGERS AND COACHES MAY NOT AT ANY TIME PHYSICALLY ENTER THE DESIGNATED PENALTY BOX AREA TO COMMUNICATE WITH THE PENALIZED SKATER.",
        ["A. True",
        "B. False"],
         "A. True"),
    new Question("32. A JAM GETS CALLED OFF FOR HAVING TOO MANY SKATERS ON THE TRACK, AND THE OFFENDING TEAM DID NOT FIELD A PIVOT. AS THE REFEREES ARE UNSURE WHO WAS THE LAST BLOCKER ON THE TRACK, WHO GETS THE PENALTY?",
        ["A. Captain",
         "B. Pivot",
         "C. Closest Blocker to Referee who made the call",
         "D. No one"],
         "C. Closest Blocker to Referee who made the call"),
    new Question("33. WHAT KIND OF PENALTY WOULD BE ISSUED IN THE FOLLOWING SCENARIO? A SKATER INITIATES CONTACT OR ENGAGES AN OPPONENT BEFORE THE FIRST WHISTLE, FORCING THE RECEIVING OPPOSING SKATER OFF BALANCE, FORWARD OR SIDEWAYS BUT DOES NOT CAUSE THEM TO LOSE THEIR ESTABLISHED STARTING POSITION.",
        ["A. No Impact/No Penalty",
         "B. Illegal Procedure penalty",
         "C. Out of Play penalty"],
         "A. No Impact/No Penalty"),
    new Question("34. THE ENGAGEMENT ZONE INCLUDES:",
        ["A. 20 feet (6 meters) behind the rearmost pack Skater and 20 feet (6 meters) in front of the foremost pack Skater",
         "B. 10 feet (3 meters) behind the rearmost pack Skater and 10 feet (3 meters) in front of the foremost pack Skater",
         "C. 20 feet (6 meters) in front of the foremost pack Skater and 10 feet (3 meters) behind the rearmost pack Skater"],
         "A. 20 feet (6 meters) behind the rearmost pack Skater and 20 feet (6 meters) in front of the foremost pack Skater"),
    new Question("35. WHICH OF THE FOLLOWING IS A NO PACK SCENARIO?",
        ["A. 4 Green Blockers are more than 10 feet (3 meters) away from 4 Red Blockers",
         "B. 4 Green Blockers are more than 10 feet (3 meters) away from 3 Red Blockers, and 1 Red Blocker has been knocked out of bounds",
         "C. 3 Green Blockers and 1 Red Blocker are more than 10 feet (3 meters) from 3 Red Blockers and 1 Green Blocker",
         "D. All of the above"],
         "D. All of the above"),
    new Question("36. TRUE OR FALSE: A BLOCKER’S PROXIMITY TO OTHER BLOCKERS IS MEASURED BY THEIR FINGERTIPS.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("37. FOR AN IN-BOUNDS BLOCKER TO LEGALLY REGAIN POSITION IN THE PACK AFTER HAVING FALLEN BEHIND OR RECOVERING FROM A FALL, A SKATER MUST:", 
        ["A. Catch up to the back of the pack by skating within the track boundaries to be considered back in play",
         "B. Skate outside track boundaries to stay out of the way until they can easily get to the back of the pack",
         "C. Wait for the pack to come back around to enter from behind"],
         "A. Catch up to the back of the pack by skating within the track boundaries to be considered back in play"),
    new Question("38. WHICH OF THE FOLLOWING IS AN EXAMPLE OF A MULTI-PLAYER BLOCK?",
        ["A. “Bowling” with a teammate by pushing them into an opponent",
         "B. Preventing an opponent from passing between Blockers by holding each other’s clothing",
         "C. Grabbing or holding a teammate’s arm while blocking"],
         "B. Preventing an opponent from passing between Blockers by holding each other’s clothing"),
    new Question("39. TRUE OR FALSE: IF A SKATER JUMPS, IT IS ILLEGAL TO HIT THEM WHILE THEY ARE IN THE AIR.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("40. TRUE OR FALSE: IF A SKATER RE-ENTERS THE TRACK FROM OUT OF BOUNDS IN FRONT OF AN OPPOSING SKATER, BETTERING THEIR POSITION, THEY WILL NOT RECEIVE A CUTTING THE TRACK PENALTY AS LONG AS THEY YIELD THE RIGHT OF WAY.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("41. TRUE OR FALSE: STANDING DURING THE LAST 10 SECONDS OF A PENALTY IS OPTIONAL.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("42. TRUE OR FALSE: IF A JAMMER FALSE STARTS BUT YIELDS ADVANTAGE, THEY WILL NOT RECEIVE A PENALTY.",
        ["A. True",
         "B. False"],
         "A. True"),
    new Question("43. GROSS MISCONDUCT INCLUDES WHICH OF THE FOLLOWING?",
        ["A. Illegal interference in game play by Skaters or support staff not involved in the jam",
         "B. Crashing into the Penalty Box and causing a chair to hit an NSO",
         "C. Repetitive and excessive use of obscene language directed at an opponent",
         "D. All of the above"],
         "D. All of the above"),
    new Question("44. WHAT KIND OF PENALTY WOULD BE ISSUED IN THE FOLLOWING SCENARIO? A SKATER IS CALLED OUT ON A PENALTY AND REFUSES TO LEAVE THE TRACK.",
        ["A. Insubordination",
         "B. No penalty",
         "C. Expulsion"],
         "A. Insubordination"),
    new Question("45. REFEREES WILL WHISTLE A JAM DEAD IF:",
        ["A. There is an injured Skater on the track who cannot get up",
         "B. Green Team’s Jammer is called to the Penalty Box, and Red Team failed to field a Jammer for that jam",
         "C. Red Team’s Jammer has scored 50 points in the jam",
         "D. A and B only"],
         "D. A and B only"),
    new Question("46. TRUE OR FALSE: AFTER SERVING A PENALTY, A JAMMER WHO RE-ENTERS THE TRACK BEHIND ALL IN-PLAY BLOCKERS BUT IN FRONT OF THE OPPOSING JAMMER, RECEIVES A PENALTY.",
       ["A. True",
        "B. False"],
        "B. False"),
    new Question("47. TRUE OR FALSE: A BLOCKER WHO LINES UP FOR A JAM BUT IS KNOCKED OUT OF BOUNDS JUST PRIOR TO THE FIRST WHISTLE MAY NOT PARTICIPATE IN THAT JAM.",
        ["A. True",
         "B. False"],
         "B. False"),
    new Question("48. TRUE OR FALSE: A SKATER WHO LEAVES THE PENALTY BOX DURING A TEAM TIMEOUT WILL RECEIVE AN ILLEGAL PROCEDURE PENALTY.",
        ["A. True",
         "B. False"],
         "A. True"),
    new Question("49. WHICH OF THE FOLLOWING WILL RESULT IN A PLAYER FOULING OUT OF A GAME?",
        ["A. Accruing more than 5 trips to the Penalty Box in either period or more than 8 trips in a game",
         "B. Accruing 7 trips to the Penalty Box in a game",
         "C. Accruing more than 5 trips to the Penalty Box in either period",
         "D. Using obscene or abusive language directed at an Official"],
         "B. Accruing 7 trips to the Penalty Box in a game"), 
    new Question("50. TRUE OR FALSE: IF A SAFETY HAZARD ON THE TRACK HAS FORCED A REFEREE TO WHISTLE A JAM DEAD AFTER THE TIME ON THE PERIOD CLOCK HAS RUN OUT, BUT NOT BEFORE THE JAM CLOCK HAS RUN OUT, THE HEAD REFEREE MAY CALL FOR AN ADDITIONAL JAM.",
        ["A. True",
         "B. False"],
         "A. True")
];

//Creates Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();

