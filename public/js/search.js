document.getElementById('search-submit').addEventListener('click', () => {
    let searchQuery = document.getElementById('search-input').value;
    let searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = `<h3>Search Results</h3>`;
    let selected = document.querySelector('.search-toggle .active input').value;
    let searchOn = selected;
    if (selected === 'ingredients'){
        searchOn = 'ingredients.name';
    }
    searchRecipes(searchQuery, searchOn).then((recipes) => {
        recipes.forEach(recipe => {
            getSpecificUser(recipe.created_by).then((user) => {
                let createdAt = new Date(recipe.createdAt);
                searchResultsContainer.innerHTML += createSearchResults(recipe.title, recipe.summary, user.username, createdAt.toDateString());
            })
        })
    })
    
});

function createSearchResults(title, summary, username, date){
    return `
    <div class="container card">
        <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-text">${summary}</p>
            <a href="#" class="btn btn-info">recipe link</a>
        </div>
        <div class="card-footer">
            <small>posted by: <a class="text-muted" href="...">${username}</a> on ${date}</small>
        </div>
    </div>
    `
}