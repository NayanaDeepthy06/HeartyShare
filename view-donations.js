// Initialize Firestore
const db = firebase.firestore();

// Load donations when DOM is ready or Refresh button is clicked
window.addEventListener("DOMContentLoaded", loadDonations);
document.getElementById("refreshDonations")?.addEventListener("click", loadDonations);

// Main function to load and render donations
function loadDonations() {
  const donationList = document.getElementById("donationsList");

  if (!donationList) {
    console.error("❌ donationsList container not found.");
    return;
  }

  donationList.innerHTML = "<p>Loading donations...</p>";
  const now = new Date();

  db.collection("donations")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        donationList.innerHTML = "<p>No food donations available right now.</p>";
        return;
      }

      donationList.innerHTML = ""; // Clear existing content

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Handle expiry and pickup times
        const expiryDate = data.expiryTime?.toDate?.() || null;
        const pickupDate = data.pickupTime?.toDate?.() || null;
        const isExpired = expiryDate ? expiryDate < now : false;

        // Format dates
        const expiryFormatted = expiryDate
          ? expiryDate.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
          : "Not specified";

        const pickupFormatted = pickupDate
          ? pickupDate.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
          : "Not specified";

        // Create donation card
        const card = document.createElement("div");
        card.className = "donation-card";
        if (isExpired) card.classList.add("expired");

        card.innerHTML = `
          <p><strong>🍲 Food Type:</strong> ${data.foodType}</p>
          <p><strong>📦 Quantity:</strong> ${data.quantity}</p>
          <p><strong>📍 Location:</strong> ${data.location}</p>
          <p><strong>📞 Contact:</strong> ${data.contact}</p>
          <p><strong>🕒 Expiry Time:</strong> ${expiryFormatted} ${
          isExpired ? '<span style="color:red; font-weight:bold;">(Expired)</span>' : ""
        }</p>
          <p><strong>🕓 Pickup Time:</strong> ${pickupFormatted}</p>
        `;

        donationList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("❌ Error fetching donations:", error);
      donationList.innerHTML = "<p>Failed to load donations. Please try again later.</p>";
    });
}



