document.getElementById("sendOtp").addEventListener("click", function () {
  const emailInput = document.getElementById("email");

  if (!emailInput.value) {
    displayNotification("Please enter a valid email address.");
    return;
  }

  const otp = generateOtp();

 
  sendEmailOtp(emailInput.value, otp)
    .then(() => {
      sessionStorage.setItem("otp", otp);
      sessionStorage.setItem("email", emailInput.value);

      window.location.href = "otp.html";
    })
    .catch((error) => {
      displayNotification("Failed to send OTP. Please try again.");
      console.error(error);
    });
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}

function sendEmailOtp(email, otp) {
  return new Promise((resolve, reject) => {
    Email.send({
      SecureToken: "073d8913-7054-489f-91a9-f4e882643111", 
      To: email,
      From: "avjuji@gmail.com", 
      Subject: "Your OTP Code",
      Body: `Your OTP code is: <b>${otp}</b><br><br>Use this code to verify your email.`,
    }).then((message) => {
      if (message === "OK") {
        resolve();
      } else {
        reject(message);
      }
    });
  });
}

function displayNotification(message) {
  const notification = document.getElementById("notification");
  notification.style.display = "block";
  notification.textContent = message;

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000); 
}
