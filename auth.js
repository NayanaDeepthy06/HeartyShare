// js/auth.js

let isLogin = true;

document.getElementById("authForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const validationMsg = document.getElementById("validationMsg");

  validationMsg.textContent = "";

  if (password.length < 6) {
    validationMsg.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (isLogin) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "index.html")
      .catch(err => validationMsg.textContent = err.message);
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => window.location.href = "index.html")
      .catch(err => validationMsg.textContent = err.message);
  }
});

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").textContent = isLogin ? "Login" : "Sign Up";
  document.getElementById("submitBtn").textContent = isLogin ? "Login" : "Sign Up";
  document.querySelector(".toggle-text").innerHTML = isLogin
    ? `Don't have an account? <a href="#" onclick="toggleForm()">Sign Up</a>`
    : `Already have an account? <a href="#" onclick="toggleForm()">Login</a>`;
  document.getElementById("validationMsg").textContent = "";
}

function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => window.location.href = "index.html")
    .catch(err => {
      alert("Google Sign-In Failed: " + err.message);
    });
}





