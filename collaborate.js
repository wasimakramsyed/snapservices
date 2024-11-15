// Show OTP field only when the phone number is 10 digits
function showOtpField() {
    const phoneNumber = document.querySelector("input[name='number']").value;
    const otpField = document.getElementById('otpField');
    
    // Check if the phone number is exactly 10 digits
    if (phoneNumber.length === 10) {
        otpField.style.display = 'block'; // Show OTP field
        sendOtpToPhone(phoneNumber); // Send OTP to the phone number
        fetch("validate.php" {method="post"})
    } else {
        otpField.style.display = 'none'; // Hide OTP field
    }
}

// Function to send the phone number to the backend to generate and send OTP
function sendOtpToPhone(phoneNumber) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/send-otp", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("OTP sent successfully!");
            } else {
                console.log("Error sending OTP:", xhr.responseText);
            }
        }
    };
    xhr.send(JSON.stringify({ phone: phoneNumber }));
}

// Function to handle form submission and validate OTP
function handlesubmit(event) {
    event.preventDefault();
    const enteredOtp = document.querySelector("input[name='otp']").value;
    const phoneNumber = document.querySelector("input[name='number']").value;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/verify-otp", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert("OTP verified successfully. All the data is saved into the database.");
            } else {
                alert("Invalid OTP entered.");
            }
        }
    };
    xhr.send(JSON.stringify({ phone: phoneNumber, otp: enteredOtp }));
}
