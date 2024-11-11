document.addEventListener('DOMContentLoaded', () => {
    const allRecipes = JSON.parse(localStorage.getItem('searchResults')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const displayResults = () => {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = ''; // Clear previous results

        allRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe-item';

            const isFavorite = favorites.includes(recipe.id); // Check if recipe is a favorite

            recipeDiv.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" />
                <span class="favorite-star" data-id="${recipe.id}" style="color: ${isFavorite ? 'gold' : 'gray'};">★</span>
            `;

            // Add event listener for star click
            const star = recipeDiv.querySelector('.favorite-star');
            star.addEventListener('click', (event) => {
                const recipeId = event.target.getAttribute('data-id');
                toggleFavorite(recipeId, star);
            });

            resultsContainer.appendChild(recipeDiv);
        });
    };

    // Toggle favorite status
    const toggleFavorite = (recipeId, starElement) => {
        const index = favorites.indexOf(recipeId);

        if (index === -1) {
            // Add to favorites
            favorites.push(recipeId);
            starElement.style.color = 'gold';
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            starElement.style.color = 'gray';
        }

        // Update favorites in localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    displayResults();
});






