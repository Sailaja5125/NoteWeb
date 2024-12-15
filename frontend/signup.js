document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const phoneNumber = form.phonenumber.value;

        // Simple form validation check
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Create the data object to send
        const data = {
            username: username,
            email: email,
            password: password,
            phonenumber: Number(phoneNumber)
        };

        // Send the data to the server using fetch
        fetch('http://localhost:8800/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tell the server the data format
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // You can handle successful registration here, e.g., redirect to login page
            alert("Registration successful!");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any errors that occur during fetch
            alert("There was an error with the registration process.");
        });
    });
});
