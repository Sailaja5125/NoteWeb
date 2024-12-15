document.addEventListener('DOMContentLoaded', async function() {
    const dropZone = document.getElementById("drop-zone");
    const fileInput = document.getElementById("file-input");
    const fileList = document.getElementById("file-list");
    const form = document.getElementById('notes-form');

    // Handle click event to trigger file input
    dropZone.addEventListener("click", function() {
        fileInput.click();
    });

    // Handle file input change event
    fileInput.addEventListener("change", function(event) {
        handleFiles(event.target.files);
    });

    // Handle drag and drop events
    dropZone.addEventListener("dragover", function(event) {
        event.preventDefault();
        dropZone.style.backgroundColor = "#e0e0e0"; // Change background color when dragging
    });

    dropZone.addEventListener("dragleave", function() {
        dropZone.style.backgroundColor = "#fff"; // Revert background color when drag leaves
    });

    dropZone.addEventListener("drop", function(event) {
        event.preventDefault();
        dropZone.style.backgroundColor = "#fff"; // Revert background color when dropped
        handleFiles(event.dataTransfer.files);
    });

    // Function to handle files
    function handleFiles(files) {
        fileList.innerHTML = ""; // Clear previous file list
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const listItem = document.createElement("li");
            listItem.textContent = file.name;
            fileList.appendChild(listItem);
        }
    }

    // Handle form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission
         
        // Get input values
        const course = document.getElementById('course').value;
        const subject = document.getElementById('subject').value;
        const description = document.getElementById('description').value;
        const chapter = document.getElementById('chapter').value;
        const files = document.getElementById('file-input').files;

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('User not authenticated. Please log in first.');
            return;
        }

        // Prepare the data to send to the server
        const formData = new FormData();
        formData.append('course', course);
        formData.append('subject', subject);
        formData.append('description', description);
        formData.append('chapter', chapter);

        for (let i = 0; i < files.length; i++) {
            formData.append('notes', files[i]);
        }

        try {
            // Send data to the server using fetch
            const response = await fetch('http://localhost:8800/api/v1/notes/uploadnotes', {
                method: 'POST',
                headers: {
                    'Authorization': `${authToken}` // Include the auth token in the header
                },
                body: formData // Send FormData object
            });
            const responseData = await response.json();    
            console.log(responseData)
        } catch (error) {
            console.log('Error:', error);
            alert("Notes uploaded successfully");
        window.location.href = 'index.html';
        }
        // Optionally redirect after successful upload
        alert("Notes uploaded successfully");
        window.location.href = 'index.html';
    });
});
