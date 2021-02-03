let urlRecipeId = urlParams.get('id');

getRecipeById(urlRecipeId).then((recipe) => {
    console.log(recipe);
    document.getElementById('recipeView').innerHTML = `
    <h1>${recipe.title}</h1>
    <p>${recipe.summary}</p>
    <p>${recipe.prep_cook_time}</p>
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
