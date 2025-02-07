document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);
        const email = formData.get('email').trim(); // Get email input

        if (!isValidEmail(email)) {
            alert("❌ Please enter a valid email address.");
            return;
        }

        // Check if email is temporary using MailCheck.ai API
        const isTemp = await isTemporaryEmail(email);
        if (isTemp) {
            alert("🚫 Temporary emails are not allowed. Please use a valid email.");
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
                alert("✅ Thanks! The form was submitted successfully.");
                this.reset(); // Reset the form
            } else {
                alert("⚠️ There was a problem with your submission.");
            }
        })
        .catch(error => {
            alert("⚠️ Network error. Please try again.");
        });
    });

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to check for temporary/disposable emails using MailCheck.ai API
    async function isTemporaryEmail(email) {
        const emailDomain = email.split('@')[1];

        try {
            const response = await fetch(`https://api.mailcheck.ai/domain/${emailDomain}`);
            const data = await response.json();

            if (data.disposable) {
                console.log(`🚫 Disposable email detected: ${emailDomain}`);
                return true; // Temporary email detected
            } else {
                return false; // Safe email
            }
        } catch (error) {
            console.error("⚠️ Email validation error:", error);
            return false; // If API fails, assume email is safe
        }
    }
});
