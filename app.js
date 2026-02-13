import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Config (حط بياناتك هنا)
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
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



