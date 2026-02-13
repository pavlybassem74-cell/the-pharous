// Firebase v10 Modular
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

// 🔥 حط بيانات Firebase بتاعتك هنا
const firebaseConfig = {
  apiKey: "PUT_YOUR_API_KEY",
  authDomain: "the-pharous.firebaseapp.com",
  projectId: "the-pharous",
  storageBucket: "the-pharous.appspot.com",
  messagingSenderId: "PUT_YOUR_ID",
  appId: "PUT_YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= LOGIN =================

window.requestAccess = async function () {
  const name = document.getElementById("username").value;

  if (!name) {
    alert("Enter your name first");
    return;
  }

  await addDoc(collection(db, "requests"), {
    name: name,
    createdAt: new Date()
  });

  alert("Request Sent 👑");
};

// ================= CHAT =================

window.sendMessage = async function () {
  const msg = document.getElementById("chatInput").value;
  const name = document.getElementById("username").value;

  if (!msg) return;

  await addDoc(collection(db, "chat"), {
    name: name,
    message: msg,
    createdAt: new Date()
  });

  document.getElementById("chatInput").value = "";
};

const chatRef = collection(db, "chat");

onSnapshot(chatRef, (snapshot) => {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  chatBox.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    chatBox.innerHTML += <p><b>${data.name}:</b> ${data.message}</p>;
  });
});
