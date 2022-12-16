const questionEl = document.getElementById('question');
const timerEl = document.getElementById('timer');
const answerOne = document.getElementById('answer-1');
const answerTwo = document.getElementById('answer-2');
const answerThree = document.getElementById('answer-3');
const answerFour = document.getElementById('answer-4');
const finalScoreEl = document.getElementById('final-score');
const highScoresListEl = document.getElementById('highscores-list')
const initialsEl = document.getElementById('initials');
let currentQuestion = -1;
let currentScore = 0;
let secondsLeft = 0;
let finalScore;

function startGame() {
    changeDiv('start-page', 'question-container');
    startTimer();
    nextQuestion();
};
function changeDiv(curr, next) {
    document.getElementById(curr).classList.add('hide');
    document.getElementById(next).removeAttribute('class')
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
    currentQuestion++;
    if (currentQ === quizQuestions.length) {
        secondsLeft = 0;
        endGame();
    } else {
        
        questionEl.textContent = quizQuestions[currentQuestion].question;
        let arr = [answerOne, answerTwo, answerThree, answerFour];
        let i = 0;
        arr.forEach(element => {
            element.textContent = quizQuestions[currentQuestion].answersArray[i].answer;
            i++
        }, i);
    };
};

function handleAnswerClick(event) {
    let correctAnswer = getCorrectAnswer(currentQuestion);

    if (event.target.textContent === correctAnswer) {
        currentScore += 10;
    } else {
        secondsLeft -= 10;
        event.target.classList.add('wrong')
    }
    setTimeout(
        () => {
            event.target.className = 'btn';
            nextQuestion();
        }, 500);
}; 

function getCorrectAnswer(currentQuestion) {
    let arr = quizQuestions[currentQuestion].answersArray;
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].correct) {
            return arr[j].answer
        }
    }
};

function endGame() {
    timerEl.textContent = 0;
    changeDiv('question-container', 'results-page')
    finalScore = currentScore;
    finalScoreEl.textContent = finalScore;
}
function handleSubmit() {
    let initials = initialsEl.value;
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];

    highScoresList.push({ initials: initials, score: finalScore });
    highScoresList = highScoresList.sort((curr, next) => {
        if (curr.score < next.score) {
            return 1
        } else if (curr.score > next.score) {
            return -1
        } else {
            return 0
        }
    });

    localStorage.setItem('highScores', JSON.stringify(highScoresList))
    window.location.href = './hs.html';
}

function populateHighScores() {
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    let list = '';
    highScoresList.forEach(score => {
        list = list + '<p>' + score.initials + '  :  ' + score.score + '</p>';
    });
    highScoresListEl.innerHTML = list;
}