 
<?php
 // Start session to manage login sessions if needed
session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = ""; // Default password for XAMPP
$dbname = "snapservices";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if email and password fields are set in POST
if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // SQL query to find the user
    $sql = "SELECT email, password FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    // Ensure the statement is prepared successfully
    if (!$stmt) {
        die("Statement preparation failed: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a user with the entered email exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $row['password'])) {
            echo "Login successful. Welcome, " . $row['email'];
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with this email.";
    }
} else {
    echo "Email or password is missing.";
}

$conn->close();
?>
