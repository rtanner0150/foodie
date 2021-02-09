let urlRecipeId = urlParams.get('id');

getRecipeById(urlRecipeId).then(async (recipe) => {
    console.log(recipe);
    let userName = ''; 
    await getSpecificUser(recipe.created_by).then((user) => {
        userName = user.username;
    });
    console.log(userName);
    let tags = '';
    let tagsArr = recipe.tags.split(' ');
    for (let i = 0; i < tagsArr.length; i++){
        tags += `<a class="text-muted" href="search.html?tags=${tagsArr[i]}">${tagsArr[i]}</a> `
    }
    document.getElementById('recipeView').innerHTML = `
    <div class="row">
        <div class="col-8">
            <h1>${recipe.title}</h1>
            <p><em>${tags}</em></p>
            <p>${recipe.summary}</p>
            <p>${recipe.prep_cook_time}</p>
        </div>
        <div class="col-4">
            <div class="recipeImage">
                <img src="${recipe.picture}">
            </div>
            <p>posted by: <a class="text-muted" href="profile.html?userID=${recipe.created_by}">${userName}</a>
        </div>
    </div>
    `;

    let ingredientsContainer = document.getElementById('ingredient');
    let substitutionsContainer = document.getElementById('substitutions');
    ingredientsContainer.innerHTML += '<ul>';
    substitutionsContainer.innerHTML += '<ul>';
    for (let i = 0; i < recipe.ingredients.length; i++){
        ingredientsContainer.innerHTML += `
        <li>${recipe.ingredients[i].name}, ${recipe.ingredients[i].amount}</li>
        `;
        substitutionsContainer.innerHTML += `
        <li>${recipe.ingredients[i].name}: ${recipe.ingredients[i].substitutions ? recipe.ingredients[i].substitutions : 'none'}</li>
        `
    }
    ingredientsContainer.innerHTML += '</ul>';
    substitutionsContainer.innerHTML += '</ul>';

    document.getElementById('directions').innerHTML += recipe.directions;
});
