import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, updateDoc, doc, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentUser = "";
let currentPoints = 0;

window.requestAccess = async function() {
  const name = document.getElementById("username").value;
  if (!name) return alert("اكتب اسمك");

  await addDoc(collection(db, "users"), {
    name: name,
    points: 0,
    approved: true
  });

  currentUser = name;
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
  document.getElementById("welcome").innerText = "Welcome " + name;
  loadChat();
  loadLeaderboard();
  loadQuiz();
};

window.showSection = function(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

window.sendMessage = async function() {
  const msg = document.getElementById("messageInput").value;
  if (!msg) return;

  await addDoc(collection(db, "messages"), {
    name: currentUser,
    text: msg,
    createdAt: new Date()
  });

  document.getElementById("messageInput").value = "";
};

function loadChat() {
  const q = query(collection(db, "messages"), orderBy("createdAt"));
  onSnapshot(q, snapshot => {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      chatBox.innerHTML += <p><b>${data.name}:</b> ${data.text}</p>;
    });
  });
}

function loadLeaderboard() {
  const q = query(collection(db, "users"), orderBy("points", "desc"));
  onSnapshot(q, snapshot => {
    const box = document.getElementById("leaderboardBox");
    box.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      box.innerHTML += <p>${data.name} - ${data.points} pts</p>;
    });
  });
}

function loadQuiz() {
  const quizBox = document.getElementById("quizBox");
  quizBox.innerHTML = 
    <h3>كم عدد فقرات العمود الفقري؟</h3>
    <button onclick="answerQuiz(33)">33</button>
    <button onclick="answerQuiz(24)">24</button>
  ;
}

window.answerQuiz = async function(answer) {
  if (answer == 33) {
    alert("صح 👏 +10 نقاط");
    currentPoints += 10;

    const snapshot = await getDocs(collection(db, "users"));
    snapshot.forEach(async d => {
      if (d.data().name === currentUser) {
        await updateDoc(doc(db, "users", d.id), {
          points: currentPoints
        });
      }
    });
  } else {
    alert("غلط ❌");
  }
};

window.alertGroup = async function() {
  await addDoc(collection(db, "messages"), {
    name: "🚨 ALERT",
    text: currentUser + " يحتاج مساعدة!",
    createdAt: new Date()
  });
};

function requestAccess() {
    const name = document.getElementById("username").value;

    if (!name) {
        alert("Please enter your name");
        return;
    }

    alert("Request sent successfully 👑");
}

window.requestAccess = requestAccess;
