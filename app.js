import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PUT_YOUR_API_KEY",
  authDomain: "PUT_YOUR_AUTH_DOMAIN",
  projectId: "PUT_YOUR_PROJECT_ID",
  storageBucket: "PUT_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PUT_YOUR_SENDER_ID",
  appId: "PUT_YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

    alert("Request Sent ✅");
    document.getElementById("username").value = "";
  } catch (error) {
    alert("Error: " + error.message);
  }
};
