document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const allRecipes = JSON.parse(localStorage.getItem('searchResults')); // Load all recipes
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || []; // Load favorites

    // Check if there are any favorites
    if (favoriteIds.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorites added yet.</p>';
        return;
    }

    // Filter recipes that are in favorites
    const favoriteRecipes = allRecipes.filter(recipe => favoriteIds.includes(recipe.id));

    // Render favorite recipes
    favoriteRecipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe-item';
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <span class="remove-favorite" data-id="${recipe.id}">Remove from Favorites</span>
        `;

        // Add click event to remove from favorites
        const removeFavorite = recipeDiv.querySelector('.remove-favorite');
        removeFavorite.addEventListener('click', (event) => {
            const recipeId = event.target.getAttribute('data-id');
            removeFromFavorites(recipeId);
            recipeDiv.remove(); // Remove from DOM
        });

        favoritesContainer.appendChild(recipeDiv);
    });

    // Function to remove a recipe from favorites
    const removeFromFavorites = (recipeId) => {
        const index = favoriteIds.indexOf(recipeId);
        if (index !== -1) {
            favoriteIds.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favoriteIds)); // Update localStorage
        }
    };
});

