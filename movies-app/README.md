🎬 Movies App
Overview
The Movies App is a web application that allows users to search, browse, and view details about popular movies. Using data from The Movie Database (TMDb) API, users can explore movies by genre, popularity, and search terms. Each movie entry includes a title, rating, overview, and more details in a modal window.

Features
Search Functionality: Users can search for movies by title, which fetches results dynamically from the TMDb API.
Genre Filtering: The app includes clickable genre tags, allowing users to quickly filter movies by genres like Action, Comedy, Romance, etc.
Movie Details Modal: Clicking on a movie opens a modal displaying the poster, rating, overview, and a link to watch the trailer on YouTube.
Responsive Design: Built with responsive design principles, the app works smoothly across various screen sizes.
Tech Stack
HTML, CSS for layout and styling
JavaScript (ES6) for interactivity and dynamic data handling
TMDb API for retrieving movie data and images
Getting Started
Prerequisites
To use this app locally, ensure you have a stable internet connection for API requests, and a modern web browser (e.g., Chrome, Firefox, Safari).

Folder Structure
index.html: Main HTML file, containing the layout of the app.
style.css: Contains all styles, including layout, colors, and responsiveness.
script.js: Contains JavaScript for fetching data from the API, handling events, and displaying movie information.
images/: Folder for storing any static images used in the project.
Usage
Search for Movies
Type a movie name in the search bar and press enter to view matching results.
If no results are found, a message will display.
Filter by Genre
Click on a genre tag (e.g., Action, Drama) to filter the displayed movies by that genre.
Click the Clear button to reset the filter.
View Movie Details
Click on a movie card to open a modal with detailed information, including:

Movie poster
Title and rating
Overview
Link to the trailer on YouTube
To close the modal, click the close button (×) or click outside the modal area.

Code Structure
API Configuration
API Key: Set as a constant in script.js for easy configuration.
API Endpoints:
Popular Movies: The app loads popular movies by default.
Search Movies: The app fetches results based on the user's search query.
Movie Details: Clicking a movie card triggers an API call to fetch detailed information.
JavaScript Highlights
Event Listeners: To manage search, genre selection, and modal interactions.
Modular Functions:
getMovies(url): Fetches movies from a provided API URL.
setGenre(): Displays genre tags dynamically.
showMovies(data): Renders movie data onto the main page.
showMovieDetails(movieId): Populates the modal with details of the selected movie.
