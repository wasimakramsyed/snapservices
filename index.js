// Function to handle the search and redirect to the search results page
function searchServices() {
    const servicesValue = document.getElementById("services").value;
    if (!servicesValue) {
        console.error('Service value is empty');
        return;
    }

    // Redirect to search results page with the service value as a query parameter
    window.location.href = `search_results.html?services=${servicesValue}`;
}

// Function to handle booking a service
async function bookService(employeeId) {
    try {
        const response = await fetch('book_service.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employeeId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('There was a problem with the booking operation:', error);
    }
}