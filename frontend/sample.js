let updates = 0; // Initial offset value to get new messages
const token = '8026391012:AAG-PY4LjLwuBQi-RdTAQFSJ5H898c7e4MI';
const baseUrl = `https://api.telegram.org/bot${token}`;

// Function to get updates
async function getUpdates() {
    try {
        const response = await fetch(`${baseUrl}/getUpdates?offset=${updates}`);
        const data = await response.json();

        // Check for specific texts and send a response
        data.result.forEach(message => {
            if (message.message) {
                handleIncomingMessage(message.message);
            }
            // Increment the update ID for each message to get the next batch
            updates = message.update_id + 1;
        });
    } catch (error) {
        console.error('Error fetching updates:', error);
    }
}

// Function to handle incoming messages
function handleIncomingMessage(message) {
    const text = message.text.trim();
    if (text === "start" || text === "Start" || text === "START") {
        sendReply(message.chat.id, "Welcome to Ever Notes");
    } else {
        fetchFile(message.chat.id, text);
    }
}

// Function to send a reply message
async function sendReply(chat_id, text) {
    try {
        const response = await fetch(`${baseUrl}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text
            })
        });
        const data = await response.json();
        console.log('Message sent:', data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to fetch the file based on the query
async function fetchFile(chat_id, query) {
    try {
        const response = await fetch(`http://localhost:8800/api/v1/notes/searchnotes?query=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('authToken')}` // Include auth token if needed
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const searchResults = await response.json();
        if (searchResults.length > 0) {
            searchResults.forEach(result => {
                if (result.file) {
                    sendReply(chat_id, `Here is your file: ${result.file}`);
                }
            });
        } else {
            sendReply(chat_id, "The requested file is not available currently.");
        }
    } catch (error) {
        console.error('Error fetching file:', error);
        sendReply(chat_id, "Failed to fetch the file. Please try again later.");
    }
}

// Function to start the bot and check for updates every 3 seconds
function startBot() {
    setInterval(getUpdates, 3000); // Check for updates every 3 seconds
}

// Start the bot
startBot();
