document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting by default

    // Perform basic validation
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill out all fields.');
        return;
    }

    // You can add more specific validation for email format, etc.

    // If validation passes, proceed to submit the form
    this.submit();
});

  