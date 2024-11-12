// API constants for fetching movies and images
const API_KEY = 'api_key=9a619654e39ac564765adc61836d569f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

// List of genres for filtering movies
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
]

// DOM elements for genre tags, main content, search form, and search input
const tagsEl = document.getElementById('tags');
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Function to highlight selected genre tags
function highlightSelection(){
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  clearBtn();
  if(selectedGenre.length != 0){
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlight');
    })
  }
}

// Initial movie load based on default API URL
getMovies(API_URL);

// Function to fetch movies based on a URL
function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        if(data.results.length !== 0){
          showMovies(data.results);
        }else{
          main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
        }
    })
}

var selectedGenre = [];

setGenre();

// Function to display genres as clickable tags
function setGenre(){
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
      const t = document.createElement('div');
      t.classList.add('tag');
      t.id=genre.id;
      t.innerText = genre.name;
      t.addEventListener('click', () => {
        if(selectedGenre.length == 0){
          selectedGenre.push(genre.id);
        }else{
          if(selectedGenre.includes(genre.id)){
            selectedGenre.forEach((id, idx) => {
              if(id == genre.id){
                selectedGenre.splice(idx, 1);
              }
            })
          }else{
            selectedGenre.push(genre.id);
          }
        }
        console.log(selectedGenre);
        getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
        highlightSelection();
      })
      tagsEl.append(t);

    })
}

// Function to display movies with details in cards
function showMovies(data){
  main.innerHTML = '';
  data.forEach(movie => {
      const movieElement = document.createElement('div');
      const {title, poster_path, vote_average, overview} = movie;
      movieElement.classList.add('movie');
      movieElement.setAttribute('data-movie-id', movie.id);
      movieElement.innerHTML = `
      <img src="${poster_path? IMG_URL + poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">
          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
              <h3>Overview</h3>
              ${overview}
          </div>
      `;
      main.appendChild(movieElement);
  });

  document.querySelectorAll('.movie').forEach(card => {
    card.addEventListener('click', function () {
        const movieId = this.getAttribute('data-movie-id');
        showMovieDetails(movieId);
    });
});
}

// Function to set rating color based on score
function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red';
    }
}

// Function to add a "clear" button for genres
function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
    clearBtn.classList.add('highlight');
  }else{
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setGenre();

      getMovies(API_URL);
    })
    tagsEl.append(clear);
  }
}

// Search form event listener to fetch movies based on search input
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    selectedGenre = [];
    highlightSelection();
    if(searchTerm){
        getMovies(searchURL + '&query=' + searchTerm)
    }else{
        getMovies(API_URL)
    }
})

const modal = document.getElementById("movieModal");
const closeModal = document.getElementsByClassName("close")[0];
const movieTitle = document.getElementById("movieTitle");
const moviePoster = document.getElementById("moviePoster");
const movieOverview = document.getElementById("movieOverview");
const movieRating = document.getElementById("movieRating");
const movieTrailer = document.getElementById("movieTrailer");

// Function to display movie details in a modal window
async function showMovieDetails(movieId) {
  const apiKey = "9a619654e39ac564765adc61836d569f";

  const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
  const movieData = await movieDetailsResponse.json();

  movieTitle.innerText = movieData.title;
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  movieOverview.innerText = movieData.overview;
  movieRating.innerText = `Rating: ${movieData.vote_average}`;

  const movieVideosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
  const videosData = await movieVideosResponse.json();
  const trailer = videosData.results.find(video => video.type === "Trailer" && video.site === "YouTube");

  if (trailer) {
      movieTrailer.href = `https://www.youtube.com/watch?v=${trailer.key}`;
      movieTrailer.style.display = "block";
  } else {
      movieTrailer.style.display = "none";
  }

  modal.style.display = "block";
}

closeModal.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
      modal.style.display = "none";
  }
}


closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.querySelectorAll(".movie-card").forEach(card => {
    card.addEventListener("click", function() {
        const movieId = this.getAttribute("data-movie-id");
        showMovieDetails(movieId);
    });
});
