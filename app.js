import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4WRSJkZxebzoZUBAoXEpSoYW1AU7La5w",
  authDomain: "the-pharous.firebaseapp.com",
  projectId: "the-pharous",
  storageBucket: "the-pharous.firebasestorage.app",
  messagingSenderId: "990089886334",
  appId: "1:990089886334:web:681e2115254ea73ce3362f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.requestAccess = async function () {
  const name = document.getElementById("nameInput").value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  try {
    await addDoc(collection(db, "requests"), {
      name: name,
      time: new Date(),
      approved: false
    });

    alert("Request sent successfully 👑");
  } catch (error) {
    alert("Error sending request");
    console.error(error);
  }
};
