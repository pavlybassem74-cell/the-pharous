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
// ================= LOGIN =================

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

