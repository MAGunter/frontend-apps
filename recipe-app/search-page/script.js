const apiKey = "862d72c6608a4035975cf281291ec699";

async function fetchRecipes(query) {
    try {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`
    );
    const data = await response.json();
    displayRecipes(data.results);
    } catch (error) {
    console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById("recipesContainer");
    recipesContainer.innerHTML = "";

    recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p>Ready in ${recipe.readyInMinutes} minutes</p>
    `;

    recipesContainer.appendChild(recipeCard);
    });
}

document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;
    if (query) {
    fetchRecipes(query);
    }
});
