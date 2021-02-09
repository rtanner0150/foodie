getRecipes().then((recipes) => {
    let feedContainer = document.getElementById('feedContainer');
    recipes.sort((a,b) => {
        if (a.createdAt > b.createdAt){
            return -1;
        } else if (b.createdAt > a.createdAt){
            return 1;
        } else {
            return 0;
        }
    });
    for (let i = 0; i < recipes.length; i++){
        feedContainer.innerHTML += `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">${recipes[i].title}</h4>
                <p class="card-text">${recipes[i].summary}</p>
                <a href="recipe-view.html?id=${recipes[i]._id}" class="btn btn-info">view recipe</a>
            </div>
            <div class="card-footer">
            <small>posted by: <a class="text-muted" href="profile.html?userID=${recipes[i].created_by}">${'username'}</a> on ${new Date(recipes[i].createdAt).toDateString()}</small>
            </div>
        </div>
        <br>
        `
    }
})