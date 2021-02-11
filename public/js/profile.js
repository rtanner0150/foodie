load();
async function load() {
    let userID = urlParams.get('userID');
    if (userID === null){
        await getLoggedInUser().then(async (user) => {
            userID = user[0]._id;
        })
    }

    getSpecificUser(userID).then((user) => {

        document.getElementById('username').innerHTML = user.username;
        document.getElementById('profilePicture').src = user.profile_pic;

    }).catch((error) => {
        console.log(error);
    });

    getUserRecipes(userID).then((recipes) => {
        document.getElementById('recipeCount').innerHTML = recipes.length;
        let recipeContainer = document.getElementById('recipeContainer');
        for (let i = 0; i < recipes.length; i++){
            recipeContainer.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${recipes[i].title}</h4>
                    <p class="card-text">${recipes[i].summary}</p>
                    <a href="recipe-view.html?id=${recipes[i]._id}" class="btn btn-info">view recipe</a>
                </div>
                <div class="card-footer">
                    <small class="text-muted">posted on: ${new Date(recipes[i].createdAt).toDateString()}</small>
                </div>
            </div>
            <br>
            `
        }
    })
}