document.getElementById('search-submit').addEventListener('click', () => {
    getRecipes().then((recipes) => {
        recipes.forEach(recipe => {
            document.getElementById('search-results').innerHTML += `
            <div class="container card">
                <div class="card-body">
                    <h4 class="card-title">${recipe.title}</h4>
                    <p class="card-text">${recipe.summary}</p>
                    <a href="#" class="btn btn-info">recipe link</a>
                </div>
                <div class="card-footer">
                    <small class="text-muted">posted by: <a class="blackText" href="...">Meryl Streep</a> on January 4, 2021</small>
                </div>
            </div>
            `
        })
    })
});