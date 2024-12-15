window.onload = function() {
    const searchForm = document.querySelector('.search-container form');
    const searchBar = document.querySelector('.searchbar');
    const container = document.querySelector('.container'); // Container where cards will be displayed

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const searchQuery = searchBar.value.trim(); // Get the search input value and trim any extra spaces

        if (searchQuery) {
            try{
                // Send the search query to the server with the query as a URL parameter
                const response = await fetch(`http://localhost:8800/api/v1/notes/searchnotes?query=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${localStorage.getItem('authToken')}` // Include auth token if needed
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const searchResults = await response.json(); // Parse the JSON response

                // Clear any previous search results
                container.innerHTML = '';

                // Display the search results
                searchResults.forEach(result => {
                    // Create a new card element
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.width = '18rem';
                    
                    card.innerHTML = `<div class="card-body">
      <h5 class="card-title">${result.chapter}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${result.subject}</h6>
      <p class="card-text">${result.description}</p>
      <div class="icons">
      <a href="#" class="card-link"><i class="fa-solid fa-eye"></i></a>
      <a href="${result.file}" class="card-link"><i class="fa-solid fa-download"></i></a>
    </div>`

                    // Append the card to the container
                    container.appendChild(card);
                });
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to fetch search results. Please try again later.');
            }
        } else {
            alert('Please enter a search query.');
        }
    });
};
