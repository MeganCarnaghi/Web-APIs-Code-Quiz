// These are the variables
var timerEl = document.querySelector(".timer");
var startScreenEl = document.querySelector("#start-screen");
var endScreenEl = document.querySelector("#end-screen");
var startBtnEl = document.querySelector("#start-button");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var score = document.querySelector("#score");
var finalScore = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submit");
var currentScore = 0;
var countdown = 120;
var currentQuestionIndex = 0;

// An event listener for the start button
startBtnEl.addEventListener("click", startQuiz);

// A function to hide the start screen and display the first question
function startQuiz() {
// hide the start screen
startScreenEl.classList.add('hide');

// show the questions
questionsEl.classList.remove('hide');


// Start and display the countdown timer (starts at 120 seconds)
var interval = setInterval(function () {
    document.querySelector("#timer").innerHTML = countdown;
    countdown --;

    // When the countdown timer gets to "0", clear it and hide the questions/choices and show the end screen with the user's final score
    if(countdown <= 0) {
    clearInterval(interval);
    endScreenEl.classList.remove('hide');
    questionsEl.classList.add('hide');
    finalScore.textContent = currentScore;
    return finalScore.textContent;
    }
    }, 1000);


    showQuestion();
}

// A function to reveal the question and answer choices
function showQuestion() {
    // get the current question from the array
    var currentQuestion = questionsArray[currentQuestionIndex];

    // update the question title with the current question
    var questionTitle = document.querySelector("#question-titles");
    questionTitle.textContent = currentQuestion.question

    // Clear out any existing question choices
    choicesEl.innerHTML = "";

    // Create a loop to go through all of the choices
    currentQuestion.choices.forEach(function(choice, i) {
    
    // Create a new button for each answer choice
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    
    // Display the answer choice text on the button
    choiceBtn.textContent = i + 1 + ". " + choice;

    // attach an event listener to each choice
    choiceBtn.addEventListener("click", questionClick);

    //display the button choices on the page
    choicesEl.appendChild(choiceBtn);
    })
}

// A function to define the actions taken when the choice buttons are clicked
function questionClick(){

    // if the correct answer is chosen, call the increaseScore()function
if(this.value === questionsArray[currentQuestionIndex].answer) {
    increaseScore();

    // if the incorrect answer is chosen, call the decreaseTimeLeft()function
} else {
    decreaseTimeLeft();
}

hideFeedback();
}

// A function to display positive feedback, increase the score when the right answer is selected, and go on to the next question
function increaseScore() {
        // increase the user's score by 1 when the right answer is chosen
        currentScore ++;
        score.textContent = currentScore;

        // Show positive feedback
        feedbackEl.classList.remove("hide");
        feedbackEl.textContent = "Yes! That is the correct answer!";

        return score.textContent;
    }

// A function to display negative feedback and decrease the time left by 10 seconds when the wrong answer is selected
    function decreaseTimeLeft() {
        // Decrease the user's remaining time by 10 seconds
        countdown -= 10;
        // Show negative feedback
        feedbackEl.classList.remove("hide");
        feedbackEl.textContent = "No. That is incorrect.";
     
    }

        // A function to display the positive feedback for 2 seconds...
        function hideFeedback() {
        feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
            feedbackEl.setAttribute("class", "hide");
        }, 1000);

        // ... and then move on to the next question
        currentQuestionIndex++;

        // Check to see if we have run out of questions
        if(currentQuestionIndex === questionsArray.length) {
            endQuiz();
        } else {
            showQuestion();
        }
    }

    // A function to end the quiz, show end screen and show user's final score
    function endQuiz() {        

        // Hide the questions
        questionsEl.classList.add('hide');

        // Hide the timer
        timerEl.classList.add('hide');

        // Show the end screen
        endScreenEl.classList.remove('hide');

        // Show the user's final score
        finalScore.textContent = currentScore;
        return finalScore.textContent;
    }

    // A function to store the user's initials and end score to local storage and go to the High Scores page
    function storeData(){
        var initials = document.getElementById("initials");
        localStorage.setItem("initials", initials.value);

        localStorage.setItem("highscores", currentScore);

        window.location = "high-scores-index.html";
    }

    


     