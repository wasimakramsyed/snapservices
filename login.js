function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Check if the fields are empty
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
      return false;
    }
  
    // Simple email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    return true; // If validation passes, allow form submission
  }
  