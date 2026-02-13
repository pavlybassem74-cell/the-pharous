import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "the-pharous.firebaseapp.com",
  projectId: "the-pharous",
  storageBucket: "the-pharous.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentUser = "";
let points = 0;

/* ================= LOGIN ================= */

async function requestAccess() {
  const name = document.getElementById("username").value;
  if (!name) return alert("Enter your name");

  await addDoc(collection(db, "requests"), {
    name: name,
    approved: true,
    points: 0
  });

  currentUser = name;

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");

  loadMessages();
  loadQuestion();
}

window.requestAccess = requestAccess;

/* ================= CHAT ================= */

async function sendMessage() {
  const text = document.getElementById("messageInput").value;
  if (!text) return;

  await addDoc(collection(db, "chat"), {
    user: currentUser,
    text: text,
    time: Date.now()
  });

  document.getElementById("messageInput").value = "";
}

window.sendMessage = sendMessage;

function loadMessages() {
  const messagesDiv = document.getElementById("messages");

  onSnapshot(collection(db, "chat"), (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      messagesDiv.innerHTML += <p><b>${msg.user}:</b> ${msg.text}</p>;
    });
  });
}

/* ================= QUIZ ================= */

const questions = [
  {
    q: "What is the largest bone in the human body?",
    answers: ["Femur", "Humerus", "Tibia"],
    correct: 0
  },
  {
    q: "How many vertebrae in cervical spine?",
    answers: ["5", "7", "12"],
    correct: 1
  }
];

let currentQuestion = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionText").innerText = q.q;

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
    points += 10;
    document.getElementById("points").innerText = points;
    alert("Correct 👑 +10 points");
  } else {
    alert("Wrong ❌");
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    alert("Quiz Finished 🔥");
  }
}

/* ================= NAVIGATION ================= */

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

window.showSection = showSection;

/* ================= SOS ================= */

async function sendSOS() {
  await addDoc(collection(db, "sos"), {
    user: currentUser,
    time: Date.now()
  });

  alert("🚨 SOS Sent to Admin!");
}

window.sendSOS = sendSOS;
