# snapservices
-> for the image source visit the https://www.freepik.com/
-> search : services
-> services : services
->
To confirm a user's phone number with an OTP sent from your server, follow these steps:

HTML Form for User Registration – Collect user details like name, email, phone number, and OTP.
PHP Script for OTP Generation and Sending – Generate and send the OTP to the user’s phone number.
PHP Script for OTP Validation and Data Storage – Validate the OTP and, upon successful verification, store the user’s data in the database.
Here's a breakdown of the process with code:

Step 1: HTML Registration Form
Create a file (e.g., register.html) that includes fields for name, email, phone number, and OTP.

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Registration with OTP</title>
</head>
<body>
  <h2>Register</h2>
  <form id="registrationForm" method="POST" action="register.php">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br><br>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required><br><br>

    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" name="phone" required><br><br>

    <button type="button" onclick="sendOTP()">Send OTP</button><br><br>

    <label for="otp">Enter OTP:</label>
    <input type="text" id="otp" name="otp" required><br><br>

    <button type="submit">Register</button>
  </form>

  <script>
    function sendOTP() {
      const phone = document.getElementById("phone").value;
      if (phone) {
        fetch("send_otp.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "phone=" + encodeURIComponent(phone)
        })
          .then(response => response.text())
          .then(data => alert(data))
          .catch(error => console.error("Error sending OTP:", error));
      } else {
        alert("Please enter a phone number first.");
      }
    }
  </script>
</body>
</html>
Step 2: PHP Script for Sending OTP (send_otp.php)
In this script, we generate a random OTP, store it in a session variable, and send it to the user’s phone number using an SMS service (such as Twilio).

Install Twilio SDK if you choose Twilio for sending SMS:

Run this command in your project directory:
bash
Copy code
composer require twilio/sdk
send_otp.php:

php
Copy code
<?php
session_start();
require 'vendor/autoload.php'; // Include the Twilio SDK
use Twilio\Rest\Client;
use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(_DIR_);
$dotenv->load();

// Retrieve credentials from .env
$sid = $_ENV['TWILIO_SID'];
$token = $_ENV['TWILIO_TOKEN'];
$twilio_number = $_ENV['TWILIO_NUMBER'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $phone = $_POST["phone"];
    $otp = rand(100000, 999999); // Generate a 6-digit OTP

    // Save the OTP in the session
    $_SESSION['otp'] = $otp;

    // Send OTP via SMS
    $client = new Client($sid, $token);
    $message = $client->messages->create(
        $phone,
        [
            'from' => $twilio_number,
            'body' => "Your OTP is: $otp"
        ]
    );

    echo "OTP sent successfully.";
}
?>
Replace your_account_sid, your_auth_token, and your_twilio_number with your Twilio credentials.

Step 3: PHP Script for OTP Validation and Data Storage (register.php)
In this file, we validate the OTP and insert the user data into the database if the OTP matches.

php
Copy code
<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Default password for XAMPP
$dbname = "snapservices";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $otp = $_POST["otp"];

    // Validate OTP
    if ($otp == $_SESSION['otp']) {
        // Insert data into the database if OTP is correct
        $stmt = $conn->prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $phone);

        if ($stmt->execute()) {
            echo "Registration successful!";
            unset($_SESSION['otp']); // Clear OTP from the session after successful registration
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Invalid OTP. Please try again.";
    }

    $conn->close();
}
?>