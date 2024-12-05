document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        service: formData.get('service')
    };

}