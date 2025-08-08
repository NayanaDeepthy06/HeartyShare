// Initialize Firebase Firestore
const db = firebase.firestore();

// ✅ Ensure user is logged in before allowing donation
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    alert("You must be logged in to donate.");
    window.location.href = "login.html";
  }
});

// ✅ Donation form submission handler
document.getElementById("donationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // 🔄 Get form values
  const foodType = document.getElementById("foodType").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const location = document.getElementById("location").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const expiryTimeInput = document.getElementById("expiryTime").value;
  const pickupTimeInput = document.getElementById("pickupTime").value;

  // 🔒 Check user authentication again
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("User not authenticated.");
    return;
  }

  // ✅ Convert date-time inputs to Firestore Timestamp (with null check)
  let expiryTimestamp = null;
  let pickupTimestamp = null;

  if (expiryTimeInput) {
    const expiryDate = new Date(expiryTimeInput);
    if (!isNaN(expiryDate.getTime())) {
      expiryTimestamp = firebase.firestore.Timestamp.fromDate(expiryDate);
    }
  }

  if (pickupTimeInput) {
    const pickupDate = new Date(pickupTimeInput);
    if (!isNaN(pickupDate.getTime())) {
      pickupTimestamp = firebase.firestore.Timestamp.fromDate(pickupDate);
    }
  }

  // 📝 Create the donation record
  const donationData = {
    foodType,
    quantity,
    location,
    contact,
    donorEmail: user.email,
    donorUID: user.uid,
    status: "Available",
    expiryTime: expiryTimestamp,
    pickupTime: pickupTimestamp,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  // ✅ Submit to Firestore
  db.collection("donations").add(donationData)
    .then(() => {
      // ✅ Show success message only after confirmed write
      alert("✅ Donation submitted successfully!");
      document.getElementById("donationForm").reset();
    })
    .catch((error) => {
      console.error("❌ Error adding donation:", error);
      alert("❌ Failed to submit donation. Please try again.");
    });
});


  