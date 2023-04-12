//Questions Array
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// Variables
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#start-button");
var questionsElement = document.querySelector("#questions-element");
var container = document.querySelector("#container");

var secondsLeft = 90;
var holdInterval = 0;
var penalty = 10; 
var ulCreate = document.createElement("ul");

// Event listener once start button is clicked, the timer starts
timer.addEventListener('click', function () {
    if (holdInterval === 0) {
        //Set interval function indicated to subtract 1 from time; also displays timer 
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft; 
            //Condition that time is up if timer is 0
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!"
            }
        }, 1000);
    }
    //Calls the question function beginning with index 0
    addQuestion(questionIndex);
})

//Question function to add questions/answers from array above
function addQuestion(questionIndex) {
    //Empty string so question/answers will be changed from question array
    questionsElement.innerHTML = "";
    ulCreate.innerHTML = "";
    // for loop to loop through questions; stops when length of array is done. 
    for (var i = 0; i <questions.length; i++) {
        //Stores questions into userQuestion and answers in userChoices variables
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        //inserts the questions into the question element
        questionsElement.textContent = userQuestion;
    }
    //Creats a list of answer choices based on questions; appends the child of ul which is the newly created li
    userChoices.forEach(function (newItem) {
        // new li is stores in list item
        var listItem = document.createElement("li");
        //adds text to new item 
        listItem.textContent = newItem;
        //gets child from questions element and adds ul
        questionsElement.appendChild(ulCreate);
        //gets child from ul element which is li (list item)
        ulCreate.appendChild(listItem);
        //Once user clicks an answer, the compare function is called to compare to right or wrong answer
        listItem.addEventListener("click", (compare));
    })
}
//Compare answer function
function compare(event) {
    //the element user chooses
    var element = event.target;
    //condition if the element matches the correct choice
    if (element.matches('li')) {

        var createDiv = document.createElement('div');
        createDiv.setAttribute('id', 'createDiv');
        //If the answer matches, the score increases and text displays "correct"
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!"
            //if answer is wrong, subtracts 10 seconds from timer and displays right answer
        } else {
            secondsLeft = secondsLeft - penalty,
            createDiv.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer
        }
    }
    //moves to next question
    questionIndex++; 
    //Condition if the questions are done then 'finished' function is called to display score if not, addQuestion function is called again
    if (questionIndex >= questions.length) {
        finished();
        createDiv.textContent = "End of quiz! " + " " + "You got " + score + "/" + questions.length + " Correct!";
    } else { 
        addQuestion(questionIndex);
    }
    questionsElement.appendChild(createDiv);
}

//finished function
function finished() {
    questionsElement.innerHTML = "";
    currentTime.innerHTML = "";
    //creates h1 element stating quiz is finished
    var addHeading = document.createElement("h1");
    addHeading.setAttribute("id", "addHeading");
    addHeading.textContent = "Quiz Finished!";
    //adds h1 from appending questionsElement child
    questionsElement.appendChild(addHeading);
    //creates 'p' element on quiz finished page
    var addP = document.createElement("p");
    addP.setAttribute("id", "addP");
    
    questionsElement.appendChild(addP); 
    //Determines final score based on seconds left 
    if (secondsLeft >= 0) {
        //time at end of game 
        var timeRemaining = secondsLeft;
        //creates p element to say "final score"
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        addP.textContent = "Final Score: " + timeRemaining; 

        questionsElement.appendChild(createP2);

    }
    //Label to enter initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsElement.appendChild(createLabel);

    // Initial input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsElement.appendChild(createInput);

    // Adds submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsElement.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        // Determines if input is valid
        if (initials === null) {
            console.log("Enter valid characters")
        // stores initials input and score 
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            //retrieves scores from local storage
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            //flow to add new scores to all scores
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace(".highscore.html");
        }
    });


}

