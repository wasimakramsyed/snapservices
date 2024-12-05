<?php
session_start();
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Default password for XAMPP
$dbname = "snapservices";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $experience = $data['experience'];
    $service = $data['service'];

    // Insert data into the database
    $sql = "INSERT INTO employees (name, email, phone, service, experience) VALUES  (?, ?, ?, ?, ?)";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Data saved successfully.']);
    } else {
        echo json_encode(['message' => 'Error: ' . $conn->error]);
    }

    $conn->close();

?>