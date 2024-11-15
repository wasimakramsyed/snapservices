document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const services = this.getAttribute('data-services');
        console.log(`Service clicked: ${services}`); // Debugging statement
        fetch(`employee.php?services=${services}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data fetched:', data); // Debugging statement
                displayEmployeeDetails(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
});

function displayEmployeeDetails(data) {
    const container = document.querySelector('.services-container');
    container.innerHTML = '';
    data.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee-details');
        employeeDiv.innerHTML = `
            <h3>${employee.name}</h3>
            <p>${employee.description}</p>
            <button onclick="bookService('${employee.id}')">Book Service</button>
        `;
        container.appendChild(employeeDiv);
    });
}

function bookService(employeeId) {
    alert(`Service booked for employee ID: ${employeeId}`);
}