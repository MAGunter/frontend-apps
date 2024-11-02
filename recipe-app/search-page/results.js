document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));

    console.log("Search results:", searchResults);

    if (searchResults && searchResults.length > 0) {
        searchResults.forEach(result => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe-item';
            recipeDiv.innerHTML = `
                <h3>${result.title}</h3>
                <img src="${result.image}" alt="${result.title}" />
            `;
            resultsContainer.appendChild(recipeDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
});

