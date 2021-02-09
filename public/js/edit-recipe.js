let urlRecipeId = urlParams.get('id');
let ingredientCount = 0;
document.getElementById('addIngredient').addEventListener('click', addIngredientRow);
document.getElementById('removeIngredient').addEventListener('click', removeIngredientRow);
let savedImagePath = '';

getRecipeById(urlRecipeId).then((recipe) => {
  document.getElementById('recipeTitle').value = recipe.title;
  document.getElementById('times').value = recipe.prep_cook_time;
  document.getElementById('summary').value = recipe.summary;
  document.querySelector('#editor .ql-editor').innerHTML = recipe.directions;
  document.getElementById('tags').value = recipe.tags;
  for (let i = 0; i < recipe.ingredients.length; i++){
    document.getElementById('ingredient' + i).value = recipe.ingredients[i].name;
    document.getElementById('amount' + i).value = recipe.ingredients[i].amount;
    document.getElementById('substitutions' + i).value = recipe.ingredients[i].substitutions;
    if (i < (recipe.ingredients.length - 1)){
      addIngredientRow();
    }
  }
  savedImagePath = recipe.picture;
});

document.getElementById('edit-recipe').addEventListener('click', () => {
  uploadRecipe(true);
});