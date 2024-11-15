<?php
header('Content-Type: application/json');
// fetch_employees.php
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

$services = $_GET['services'];
$sql = "SELECT * FROM employees WHERE services='$services'";
$result = $conn->query($sql);

$employees = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
}

echo json_encode($employees);

$conn->close();
?>