const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

document.addEventListener('DOMContentLoaded', async function() {
    const form = document.querySelector('form'); // Select the form element

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get input values
        const email = document.querySelector('.input-div.one .input').value;
        const password = document.querySelector('.input-div.pass .input').value;

        // Print the values to the console (for demonstration)
        console.log('Email:', email);
        console.log('Password:', password);

        // Simple form validation check
        if (!email || !password) {
            alert("Please fill in both fields!");
            return;
        }

        // Prepare data for the API request
        const loginData = {
            email: email,
            password: password
        };

        // Send data to the server using fetch
		try {
            // Send data to the server using fetch with async/await
            const response = await fetch('http://localhost:8800/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData) // Convert loginData object to JSON
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            // Parse the response JSON
            const data = await response.json();
            console.log(data.message)
            // Assuming the response contains a token
            const token = data.message.access_token;
            // Save the token to localStorage
            localStorage.setItem('authToken', token);

            // Print the token for demonstration (you can remove this in production)
            console.log('Auth Token:', token);

            // Redirect to another page or perform additional actions
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to a dashboard page

        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    });
    });

	