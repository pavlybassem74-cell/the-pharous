let currentUser = "";
let points = 0;

function login() {
  const name = document.getElementById("username").value;

  if (!name) {
    alert("Enter your name first");
    return;
  }

  currentUser = name;
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value;

  if (!msg) return;

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += <p><b>${currentUser}:</b> ${msg}</p>;
  input.value = "";
}

const questions = [
  {
    question: "What does PT stand for?",
    answers: ["Physical Therapy", "Personal Training", "Power Training"],
    correct: 0
  },
  {
    question: "Which muscle extends the knee?",
    answers: ["Hamstring", "Quadriceps", "Gluteus"],
    correct: 1
  }
];

let currentQuestion = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionText").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (index === questions[currentQuestion].correct) {
    points++;
    document.getElementById("points").innerText = points;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    alert("Quiz Finished 🎉");
  }
}

loadQuestion();
