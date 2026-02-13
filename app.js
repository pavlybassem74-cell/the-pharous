// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ================= FIREBASE CONFIG =================
// ⚠️ حط بياناتك الصح من Firebase هنا
const firebaseConfig = {
  apiKey: "PUT_YOUR_API_KEY_HERE",
  authDomain: "PUT_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PUT_YOUR_PROJECT_ID_HERE",
  storageBucket: "PUT_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PUT_YOUR_SENDER_ID_HERE",
  appId: "PUT_YOUR_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ================= GLOBAL VARIABLES =================
let currentUser = "";
let points = 0;


// ================= LOGIN =================
window.requestAccess = async function () {
  const nameInput = document.getElementById("username");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Enter your name first");
    return;
  }

  currentUser = name;

  // save request to firestore
  await addDoc(collection(db, "requests"), {
    name: name,
    createdAt: new Date()
  });

  // hide login
  document.getElementById("loginPage").style.display = "none";

  // show main app
  document.getElementById("mainApp").classList.remove("hidden");

  alert("Welcome " + name + " 👑");
};


// ================= CHAT =================
window.sendMessage = async function () {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (!message) return;

  await addDoc(collection(db, "messages"), {
    name: currentUser,
    text: message,
    createdAt: new Date()
  });

  input.value = "";
};

// real-time listener
const messagesRef = collection(db, "messages");
const q = query(messagesRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  chatBox.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    const div = document.createElement("div");
    div.innerHTML = <strong>${data.name}:</strong> ${data.text};

    chatBox.appendChild(div);
  });
});


// ================= QUIZ =================
const questions = [
  {
    question: "How many bones are in the human body?",
    answers: ["206", "150", "300", "120"],
    correct: 0
  },
  {
    question: "Which muscle is responsible for shoulder abduction?",
    answers: ["Deltoid", "Biceps", "Triceps", "Hamstring"],
    correct: 0
  }
];

let currentQuestionIndex = 0;

window.startQuiz = function () {
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  const q = questions[currentQuestionIndex];

  document.getElementById("questionText").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;

    btn.onclick = function () {
      if (index === q.correct) {
        points += 10;
        document.getElementById("points").innerText = points;
        alert("Correct 🎉");
      } else {
        alert("Wrong ❌");
      }

      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        alert("Quiz Finished 👑");
      }
    };

    answersDiv.appendChild(btn);
  });
}


// ================= EMERGENCY BUTTON =================
window.sendAlert = async function () {
  await addDoc(collection(db, "alerts"), {
    name: currentUser,
    createdAt: new Date()
  });

  alert("Emergency Alert Sent 🚨");
};
