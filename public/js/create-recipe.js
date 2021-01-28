let ingredientCount = 0;
document.getElementById('addIngredient').addEventListener('click', addIngredientRow);

document.getElementById('create-recipe').addEventListener('click', () => {
  let title = document.getElementById('recipeTitle').value;
  let times = document.getElementById('times').value;
  let summary = document.getElementById('summary').value;
  let directions = document.querySelector('#editor .ql-editor').innerHTML;
  let tags = document.getElementById('tags').value;
  let ingredients = [];
  for (let i = 0; i < document.querySelectorAll('.ingredientRow').length; i++){
    let ingredient = {
      name: document.getElementById('ingredient' + i).value,
      amount: document.getElementById('amount' + i).value,
      substitutions: document.getElementById('substitutions' + i).value
    }
    ingredients.push(ingredient);
  }
  handleImageUpload(document.getElementById('image')).then((imagePath) => {
    console.log('imagePath: ' + imagePath);
    createRecipe(title, ingredients, times, directions, summary, imagePath, tags).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  });
  
});