document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const services = this.getAttribute('data-services');
        window.location.href = `search_results.html?services=${services}`;
    });
});

//   