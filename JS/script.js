const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

const time = document.querySelector('.timer');
let timeLimit = 60;
let timer;

// Function to show the popup when start button is clicked
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// Function to close the popup when exit button is clicked
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

// Function to start the quiz when continue button is clicked
continueBtn.onclick = () => {
   quizSection.classList.add('active');
   popupInfo.classList.remove('active');
   main.classList.remove('active');
   quizBox.classList.add('active');

   showQuestions(0);
   questionCounter(1);
   headerScore();

   startTimer();

}

// Function to reset the quiz and start again when try again button is clicked
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();

    timeLimit = 60;
    timerElement.textContent = timeLimit;

    startTimer();
}

// Function to go back to home when go home button is clicked
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    stopTimer();

}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

// Function to handle the next button click and show the next question
nextBtn.onclick = () => {
    if(questionCount < questions.length-1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
        stopTimer();
    }
   
 }

 const optionList = document.querySelector('.option-list');

 const timerElement = document.getElementById('Time-remaining');

 //Function to start the timer
 function startTimer() {
    timer = setInterval(() =>{
        timeLimit--;
        timerElement.textContent = timeLimit;

        if(timeLimit <=0) {
            clearInterval(timer);
            showResultBox();
        }
    }, 1000);
 }

 //Function to stop the timer
 function stopTimer(){
    clearInterval(timer);
 }


//getting questions  and options from array
function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;
   
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++){
       option[i].setAttribute ('onclick', 'optionSelected(this)');
    }
} 

// Function to handle the user's option selection
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');
        
        //If answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');   
            }
        } 
    }
   
    //If user has selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

// Function to update the question counter in the quiz
function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Function to update the user's score in the header
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Function to display the result box with the user's performance
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const completedQuestions = questionCount+1;
    const wrongAnswers = completedQuestions - userScore;
    const takenTime = 60 - timeLimit;

    const resultDetails = document.createElement('div');
    resultDetails.classList.add('result-details');
    resultDetails.innerHTML = `
        <p>Completed Questions: ${completedQuestions}</p>
        <p>Wrong Answers: ${wrongAnswers}</p>
        <p>Time Taken: ${takenTime} seconds</p>
    `;
    resultBox.appendChild(resultDetails);


    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(160, 158, 158, 0.1) 0deg)`;

        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }

    }, speed);
    const resultText = document.createElement('p');
    resultText.classList.add('result-text');
    resultBox.appendChild(resultText);

    if (userScore > 7) {
        resultText.textContent = "Excellent Performance, Keep Up Your Best.";
        resultText.style.color = "green";
    } else if(userScore>5) {
        resultText.textContent = "Good Performance, Can Do Better.";
        resultText.style.color = "orange";
    }else{
        resultText.textContent = "Poor Performance, Keep Practicing.";
        resultText.style.color = "red";
    }

    

}


