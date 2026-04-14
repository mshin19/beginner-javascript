// The Recipe Puppy API used in the course is broken
// Please use this replacement API URL "https://recipes.beginnerjavascript.com/api"

const baseEndpoint = 'https://recipes.beginnerjavascript.com/api'

async function fetchRecipes(query) {
    const response = await fetch(`https://corsproxy.io/?url=${baseEndpoint}?q=${query}`);
    const data = await response.json();
    console.log(data);
}

fetchRecipes('pizza');