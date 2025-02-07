document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);
        const email = formData.get('email').trim(); // Get email input

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (isTemporaryEmail(email)) {
            alert("Temporary emails are not allowed. Please use a valid email.");
            return;
        }

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
                alert("Thanks! The form was submitted successfully.");
                this.reset(); // Reset the form
            } else {
                alert("There was a problem with your submission.");
            }
        })
        .catch(error => {
            alert("There was a network error. Please try again.");
        });
    });

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to check for temporary/disposable email
    function isTemporaryEmail(email) {
        const tempDomains = [
            "tempmail.com", "10minutemail.com", "guerrillamail.com", "mailinator.com", "disposablemail.com",
            "fakeemail.com", "mailtemp.net", "sharklasers.com", "trashmail.com", "yopmail.com"
        ];

        const emailDomain = email.split('@')[1]; // Extract domain from email
        return tempDomains.includes(emailDomain);
    }
});
