// script.js

// Sample array to store booked services (in real-world, this data could come from a server or API)
let bookedServices = [
   
];

// Function to display services
function displayServices() {
    const servicesList = document.getElementById("servicesList");
    servicesList.innerHTML = ''; // Clear the existing list
    
    // If no services are booked, display a message
    if (bookedServices.length === 0) {
        servicesList.innerHTML = "<li>No services booked yet.</li>";
    } else {
        bookedServices.forEach(service => {
            const li = document.createElement('li');
            li.innerHTML = `${service.name} - ${service.date}`;
            servicesList.appendChild(li);
        });
    }
}

// Add a new service to the list
document.getElementById("serviceForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission and page reload

    const serviceName = document.getElementById("serviceName").value.trim();

    // Check if the input is not empty
    if (serviceName) {
        // Add the new service to the list
        const newService = {
            name: serviceName,
            date: new Date().toLocaleDateString()  // Date when the service was added
        };
        bookedServices.push(newService);
        displayServices();  // Update the displayed list
        
        // Clear the input field
        document.getElementById("serviceName").value = '';
    }
});

// Initial call to display services when the page loads
displayServices();

document.addEventListener('DOMContentLoaded', async () => {
    const bookingsContainer = document.getElementById("bookings");

    if (!bookingsContainer) {
        console.error('Bookings container element not found');
        return;
    }

    try {
        const response = await fetch('fetch_bookings.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const bookings = await response.json();

        bookingsContainer.innerHTML = "";
        bookings.forEach(booking => {
            const bookingDiv = document.createElement("div");
            bookingDiv.classList.add("booking-details");
            bookingDiv.innerHTML = `
                <h3>Booking ID: ${booking.id}</h3>
                <p>Name: ${booking.name}</p>
                <p>Email: ${booking.email}</p>
                <p>Phone Number: ${booking.phoneno}</p>
                <p>Service: ${booking.services}</p>
            `;
            bookingsContainer.appendChild(bookingDiv);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
