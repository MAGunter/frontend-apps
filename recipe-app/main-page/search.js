const apiKey = '862d72c6608a4035975cf281291ec699';

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched:", data);
                localStorage.setItem('searchResults', JSON.stringify(data.results));
                window.location.href = '../search-page/index.html';
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        alert("Please enter a search term.");
    }
});

