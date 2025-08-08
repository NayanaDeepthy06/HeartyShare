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

window.onload = function () {
  const donationList = document.getElementById("donationsList");

  db.collection("donations")
    .where("status", "==", "Available")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      let hasValidDonations = false;
      donationList.innerHTML = "";

      const now = new Date();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const docId = doc.id;

        // Check for expiry
        if (data.expiryTime && data.expiryTime.toDate) {
          const expiryDate = data.expiryTime.toDate();
          if (expiryDate < now) {
            db.collection("donations").doc(docId).delete()
              .then(() => console.log(`Deleted expired donation: ${docId}`))
              .catch((error) => console.error("Delete failed:", error));
            return; // Skip this donation
          }
        }

        hasValidDonations = true;

        const expiryFormatted = data.expiryTime?.toDate?.().toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) || "Not specified";

        const pickupFormatted = data.pickupTime?.toDate?.().toLocaleString(undefined, {
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
          <p><strong>Expiry Time:</strong> ${expiryFormatted}</p>
          <p><strong>Pickup Time:</strong> ${pickupFormatted}</p>
          <hr>
        `;
        donationList.appendChild(card);
      });

      if (!hasValidDonations) {
        donationList.innerHTML = "<p>No active (unexpired) food donations available.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching donations:", error);
      donationList.innerHTML = "<p>Failed to load donations. Please try again later.</p>";
    });
};


