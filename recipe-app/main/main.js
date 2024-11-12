const apiKey = '862d72c6608a4035975cf281291ec699';
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsSection = document.getElementById('resultsSection');
const favoritesSection = document.getElementById('favoritesSection');
const resultsContainer = document.getElementById('resultsContainer');
const favoritesContainer = document.getElementById('favoritesContainer');
const favoritesButton = document.getElementById('favoritesButton');

// Show/hide sections
function showSection(sectionId) {
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Handle search functionality
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a recipe name.');
    return;
  }

  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data.results);
      localStorage.setItem('searchResults', JSON.stringify(data.results));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to fetch recipes.');
    });
});

// Display the search results
function displayResults(results) {
  resultsContainer.innerHTML = '';
  results.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe-item');
    const isFavorite = isInFavorites(recipe.id);
    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" />
      <p>${recipe.summary || 'No description available.'}</p>
      <button onclick="toggleFavorite(${recipe.id})">${isFavorite ? '★' : '☆'}</button>
    `;
    resultsContainer.appendChild(recipeElement);
  });
  showSection('resultsSection');
}

// Toggle the favorite status of a recipe
function toggleFavorite(recipeId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(recipeId)) {
    favorites = favorites.filter(id => id !== recipeId);
  } else {
    favorites.push(recipeId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesButton();
  displayResults(JSON.parse(localStorage.getItem('searchResults')));
}

// Check if a recipe is in favorites
function isInFavorites(recipeId) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.includes(recipeId);
}

// Update the favorites section when clicking the "Favorites" button
favoritesButton.addEventListener('click', () => {
  showSection('favoritesSection');
  displayFavorites();
});

// Display the favorite recipes
function displayFavorites() {
  favoritesContainer.innerHTML = '';
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No favorites added yet.</p>';
  } else {
    favorites.forEach(recipeId => {
      fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(recipe => {
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('recipe-item');
          recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <button onclick="removeFromFavorites(${recipe.id})">Remove</button>
          `;
          favoritesContainer.appendChild(recipeElement);
        });
    });
  }
}

// Remove a recipe from favorites
function removeFromFavorites(recipeId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(id => id !== recipeId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
}

// Update the favorites button text based on favorites count
function updateFavoritesButton() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favoritesButton.textContent = `Favorites (${favorites.length})`;
}
