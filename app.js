import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

lest app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= LOGIN =================
window.requestAccess = async function () {

  const name = document.getElementById("username").value;

  if (!name) {
    alert("Enter your name first");
    return;
  }

  try {
    await addDoc(collection(db, "requests"), {
      name: name,
      createdAt: new Date()
    });

    alert("Request Sent 👑");
  } catch (error) {
    console.error(error);
    alert("Error sending request");
  }
};
// ================= LOGIN =================

let app = initializeApp(firebaseConfig);
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





