document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);

        // Send the form data to Formspree
        fetch('https://formspree.io/f/myzygvpr', { // Replace with your Formspree URL
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                alert("Thanks! The form was submitted successfully.");
                this.reset(); // Reset the form
            } else {
                // Handle errors
                alert("There was a problem with your submission.");
            }
        })
        .catch(error => {
            // Handle network errors
            alert("There was a network error. Please try again.");
        });
    });
});
