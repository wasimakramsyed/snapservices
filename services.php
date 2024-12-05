<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "snapservices";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$employeeId = $data['employeeId'];
$employeeName = $data['employeeName'];
$employeeServices = $data['employeeServices'];

// Insert booking into the bookings table
$sql = "INSERT INTO Bookings (name, services) VALUES ('$employeeName', '$employeeServices')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => 'Booking successful']);
} else {
    echo json_encode(['message' => 'Error: ' . $conn->error]);
}

$conn->close();
?> 