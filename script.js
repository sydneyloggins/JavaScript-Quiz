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

timer.addEventListener('click', function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft; 

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!"
            }
        }, 1000);
    }
    addQuestion(questionIndex);
})

function addQuestion(questionIndex) {
    questionsElement.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i <questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsElement.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsElement.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches('li')) {

        var createDiv = document.createElement('div');
        createDiv.setAttribute('id', 'createDiv');

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!"
        } else {
            secondsLeft = secondsLeft - penalty,
            createDiv.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer
        }
    }
    questionIndex++; 

    if (questionIndex >= questions.length) {
        finished();
        createDiv.textContent = "End of quiz! " + " " + "You got " + score + "/" + questions.length + " Correct!";
    } else { 
        addQuestion(questionIndex);
    }
    questionsElement.appendChild(createDiv);
}

function finished() {
    questionsElement.innerHTML = "";
    currentTime.innerHTML = "";

    var addHeading = document.createElement("h1");
    addHeading.setAttribute("id", "addHeading");
    addHeading.textContent = "Quiz Finished!";

    questionsElement.appendChild(addHeading);

    var addP = document.createElement("p");
    addP.setAttribute("id", "addP");
    
    questionsElement.appendChild(addP); 

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        addP.textContent = "Final Score: " + timeRemaining; 

        questionsElement.appendChild(createP2);

    }
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsElement.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsElement.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsElement.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highscore.html");
        }
    });


}

