// QUESTIONS
const questions = [
  {
    title: "Inside which HTML element do we put JavaScript?",
    choices: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: "<script>"
  },
  {
    title: "Which keyword declares a variable?",
    choices: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: ["Numbers", "Strings", "Booleans", "All of the above"],
    answer: "All of the above"
  },
  {
    title: "Which symbol is used for comments in JavaScript?",
    choices: ["//", "<!-- -->", "/* */", "Both // and /* */"],
    answer: "Both // and /* */"
  }
];

// DOM ELEMENTS
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const endScreen = document.getElementById("end-screen");
const highscoresScreen = document.getElementById("highscores-screen");

const questionTitle = document.getElementById("question-title");
const choicesDiv = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const timerEl = document.getElementById("timer");
const finalScoreEl = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");

let currentQuestion = 0;
let timeLeft = 60;
let timer;

// START QUIZ
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hide");
  questionScreen.classList.remove("hide");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) endQuiz();
  }, 1000);

  showQuestion();
}

// SHOW QUESTION
function showQuestion() {
  let q = questions[currentQuestion];
  questionTitle.textContent = q.title;
  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    let btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = checkAnswer;
    choicesDiv.appendChild(btn);
  });
}

// CHECK ANSWER
function checkAnswer() {
  if (this.textContent !== questions[currentQuestion].answer) {
    timeLeft -= 10;
    feedback.textContent = "Wrong!";
  } else {
    feedback.textContent = "Correct!";
  }

  setTimeout(() => feedback.textContent = "", 800);

  currentQuestion++;

  if (currentQuestion === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// END QUIZ
function endQuiz() {
  clearInterval(timer);
  questionScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScoreEl.textContent = timeLeft;
}

// SAVE SCORE
document.getElementById("submit-score").addEventListener("click", () => {
  let initials = initialsInput.value.trim();
  if (!initials) return;

  let scores = JSON.parse(localStorage.getItem("highscores")) || [];
  scores.push({ initials, score: timeLeft });

  localStorage.setItem("highscores", JSON.stringify(scores));
  showHighscores();
});

// VIEW HIGH SCORES
document.getElementById("view-scores").addEventListener("click", showHighscores);

function showHighscores() {
  startScreen.classList.add("hide");
  questionScreen.classList.add("hide");
  endScreen.classList.add("hide");
  highscoresScreen.classList.remove("hide");

  let list = document.getElementById("highscores-list");
  list.innerHTML = "";

  let scores = JSON.parse(localStorage.getItem("highscores")) || [];

  scores
    .sort((a, b) => b.score - a.score)
    .forEach(s => {
      let li = document.createElement("li");
      li.textContent = `${s.initials} - ${s.score}`;
      list.appendChild(li);
    });
}

// CLEAR SCORES
document.getElementById("clear-scores").addEventListener("click", () => {
  localStorage.removeItem("highscores");
  showHighscores();
});

// GO BACK
document.getElementById("go-back").addEventListener("click", () => {
  highscoresScreen.classList.add("hide");
  startScreen.classList.remove("hide");
});
