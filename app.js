import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
  getFirestore, 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "PUT_YOUR_API_KEY_HERE",
  authDomain: "PUT_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PUT_YOUR_PROJECT_ID_HERE",
  storageBucket: "PUT_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PUT_YOUR_SENDER_ID_HERE",
  appId: "PUT_YOUR_APP_ID_HERE"
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4VRsJkZxebzoZUBAoXEpSoYW1AU7La5w",
  authDomain: "the-pharous.firebaseapp.com",
  projectId: "the-pharous",
  storageBucket: "the-pharous.firebasestorage.app",
  messagingSenderId: "990089886334",
  appId: "1:990089886334:web:681e2115254ea73ce3362f",
  measurementId: "G-C06VT9FQKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);// ================= LOGIN =================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.requestAccess = async function () {

  const nameInput = document.getElementById("username");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name first 👑");
    return;
  }

  try {

    await addDoc(collection(db, "requests"), {
      name: name,
      createdAt: new Date(),
      status: "pending"
    });

    alert("Request Sent Successfully ✅");

    nameInput.value = "";

  } catch (error) {

    console.error("Error adding document: ", error);
    alert("Something went wrong ❌ Check console");

  }
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


