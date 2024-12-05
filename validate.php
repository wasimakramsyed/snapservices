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