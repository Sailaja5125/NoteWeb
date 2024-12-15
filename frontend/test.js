async function getAllNotes() {
    try {
        const response = await fetch('http://localhost:8800/api/v1/notes/shownotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFiYjE4ZTU4MjNhMmExNmZkNDc1NzYiLCJlbWFpbCI6InNhaWxhamFwdXZhbGFhYTUxMjVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSUJCb0MvM3IzN0d3cWVMMm1UT3djdU5RZm1PSi9FNzJ2dUhmV3c3N1BOdXJwUGJ2eWwyaWEiLCJpYXQiOjE3MjI1MjgxNTF9.3Xjdk7Z_qXh3u86mdaDgqy6VDCkmYrEMWO1lUJ07XcQ'
            },
            mode: "cors"
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Notes Retrieved:', data);
        return data;
    } catch (error) {
        console.error('Get Notes Error:', error.message);
        throw error;
    }
  }
  getAllNotes();
  