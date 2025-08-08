// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzP9lHf821sKxQiAswaQ4CEEUkyWzkE",
    authDomain: "heartyshare-88200.firebaseapp.com",
    projectId: "heartyshare-88200",
    storageBucket: "heartyshare-88200.appspot.com",
    messagingSenderId: "272543673598",
    appId: "1:272543673598:web:a07555129d289a48fa89af",
    measurementId: "G-9HVKJFZK0P"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  window.onload = () => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        alert("You must be logged in to view your donations.");
        window.location.href = "login.html";
        return;
      }
  
      const donationList = document.getElementById("myDonationsList");
      donationList.innerHTML = "<p>Loading your donations...</p>";
  
      db.collection("donations")
        .where("donorEmail", "==", user.email)
        .orderBy("timestamp", "desc")
        .get()
        .then(querySnapshot => {
          donationList.innerHTML = "";
  
          if (querySnapshot.empty) {
            donationList.innerHTML = "<p>You have not submitted any donations yet.</p>";
            return;
          }
  
          querySnapshot.forEach(doc => {
            const data = doc.data();
  
            const expiryFormatted = data.expiryTime?.toDate?.().toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }) || "Not specified";
  
            const card = document.createElement("div");
            card.className = "donation-card";
            card.innerHTML = `
              <p><strong>Food Type:</strong> ${data.foodType}</p>
              <p><strong>Quantity:</strong> ${data.quantity}</p>
              <p><strong>Location:</strong> ${data.location}</p>
              <p><strong>Contact:</strong> ${data.contact}</p>
              <p><strong>Status:</strong> <span class="status ${data.status.toLowerCase()}">${data.status}</span></p>
              <p><strong>Expiry Time:</strong> ${expiryFormatted}</p>
              <hr>
            `;
            donationList.appendChild(card);
          });
        })
        .catch(error => {
          console.error("Error fetching user donations:", error);
          donationList.innerHTML = "<p>Failed to load your donations. Please try again later.</p>";
        });
    });
  };
  