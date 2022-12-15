const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answerOne = document.getElementById('answer-1');
const answerTwo = document.getElementById('answer-2');
const answerThree = document.getElementById('answer-3');
const answerFour = document.getElementById('answer-4');
let currentQuestion = 0;
let currentScore = 0;

function changeDiv(curr, next) {
    document.getElementById(curr).classList.add('hide');
    document.getElementById(next).removeAttribute('class')
};

function startGame() {
    changeDiv('start-page', 'question-container');
    startTimer();
    nextQuestion();
    currentQuestion = 0;
};

//Timer 
function startTimer() {
    timerEl.textContent = secondsLeft;
    let timerInterval = setInterval(
        () => {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
};

function nextQuestion() {
    if (currentQ = questionBank.length - 1) {
        endGame();
    } else {
        
        questionEl.textContent = questionBank[currentQ].question;
        answerOne.textContent = questionBank[currentQ].answersArray[currentQ].answer;
        answerTwo.textContent = questionBank[currentQ].answersArray[currentQ].answer;
        answerThree.textContent = questionBank[currentQ].answersArray[currentQ].answer;
        answerFour.textContent = questionBank[currentQ].answersArray[currentQ].answer;
        currentQuestion++;
    }
}

function handleAnswerClick(event) {
}; 

function getCorrectAnswer(currentQuestion) {
    let arr = questionBank[currentQuestion].answersArray;
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].correct) {
            return arr[j].answer
        }
    }
};

function endGame() {
    
    changeDiv('question-container', 'results-page')
}