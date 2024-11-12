🍲 Recipe App
Overview
The Recipe App is a web application designed to help users search for and explore a wide variety of recipes. Built with Spoonacular's Recipe API, this app allows users to search recipes by name, view detailed information, and save their favorite recipes for easy access. Each recipe includes an image, title, short description, and the option to view more details.

Features
Recipe Search: Users can search recipes by entering keywords. Results display with images, titles, and brief descriptions.
Favorites System: Each recipe has a heart icon that allows users to add it to their favorites list, accessible through the main menu. Users can easily add or remove recipes from favorites.
Recipe Details: Clicking on a recipe displays detailed information, including ingredients and preparation steps.
Responsive Design: The app is fully responsive and works well on both desktop and mobile devices.
Tech Stack
HTML, CSS for layout and styling
JavaScript (ES6) for interactive elements and API integration
Spoonacular API for fetching recipe data
Getting Started
Prerequisites
A modern web browser (Chrome, Firefox, Safari, etc.) to view the app.
Internet access for API calls to Spoonacular.

Folder Structure
index.html: Main HTML file containing the layout for the app.
style.css: Contains styling rules for a responsive and visually appealing interface.
app.js: Contains JavaScript for handling search, favorites, and interactions.
images/: Stores any additional static images used within the app.
Usage
Search for Recipes
Enter a recipe name in the search bar and click the search icon or press enter.
Results matching your search query will display with images, titles, and descriptions.
Add to Favorites
Click the heart icon on any recipe card to add it to the favorites list.
To remove a recipe from favorites, simply click the heart icon again.
Access all saved favorites by clicking the Favorites link in the main menu.
View Recipe Details
Click on a recipe card to see detailed information, including:
Recipe image
List of ingredients
Step-by-step preparation instructions
To close the detail view, click the close button or outside the modal area.
Code Structure
API Integration
API Key: Stored within app.js as a constant for ease of access.
Endpoints:
Recipe Search: Fetches results based on the user’s search input.
Recipe Details: Provides detailed information about each selected recipe.
JavaScript Highlights
Event Listeners: To handle search functionality, favorites selection, and modal interactions.
Main Functions:
searchRecipes(query): Fetches recipes based on the search input.
showRecipes(data): Displays search results on the main page.
toggleFavorite(recipeId): Adds or removes a recipe from favorites.
showRecipeDetails(recipeId): Fetches and displays detailed information in a modal.
