let urlRecipeId = urlParams.get('id');
let ingredientCount = 0;
document.getElementById('addIngredient').addEventListener('click', addIngredientRow);
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
    addIngredientRow();
  }
  savedImagePath = recipe.picture;
});

document.getElementById('edit-recipe').addEventListener('click', () => {
  uploadRecipe(true);
});



//for later- when submitting edited recipe, if no file input, set as prev value
// if (document.getElementById('image').files[0] === undefined){
//   recipe.picture = recipe.picture
// }

// document.getElementById('create-recipe').addEventListener('click', () => {
//   let title = document.getElementById('recipeTitle').value;
//   let times = document.getElementById('times').value;
//   let summary = document.getElementById('summary').value;
//   let directions = document.querySelector('#editor .ql-editor').innerHTML;
//   let tags = document.getElementById('tags').value;
//   let ingredients = [];
//   for (let i = 0; i < document.querySelectorAll('.ingredientRow').length; i++){
//     let ingredient = {
//       name: document.getElementById('ingredient' + i).value,
//       amount: document.getElementById('amount' + i).value,
//       substitutions: document.getElementById('substitutions' + i).value
//     }
//     ingredients.push(ingredient);
//   }
//   handleImageUpload(document.getElementById('image')).then((imagePath) => {
//     console.log('imagePath: ' + imagePath);
//     createRecipe(title, ingredients, times, directions, summary, imagePath, tags).then((result) => {
//       console.log(result);
//     }).catch((error) => {
//       console.log(error);
//     });
//   });
  
// });