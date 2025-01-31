const chatWithAssistant = async (queries) => {
    const url = "http://127.0.0.1:5000/chat";
    const data = { queries: queries.queries };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

const uploadFile = async (file) => {
    const url = 'http://127.0.0.1:5000/upload_file';
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('File Details:', file); // Log file details
        alert('File uploaded successfully!');
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

const sendMessage = async () => {
    const queryInput = document.getElementById('user-query');
    const query = queryInput.value;
    if (query) {
        const response = await chatWithAssistant({ queries: [query] });
        displayResponse(response);
        queryInput.value = '';
    }
};

const displayResponse = (response) => {
    const chatOutput = document.querySelector('.ans');

    if (response && response.messages && response.messages.length > 0) {
        const messageElement = document.createElement('p');
        messageElement.textContent = response.messages[0];
        chatOutput.appendChild(messageElement);
    } else {
        console.error('Invalid response format', response);
    }
};

document.getElementById('user-query').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior
        sendMessage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById("drop-zone1");
    const fileInput = document.getElementById("file-input");
    const fileList = document.getElementById("file-list1");

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
            console.log('File Details:', file); // Log file details
            uploadFile(file);
        }
    }
});
// weoking 100%