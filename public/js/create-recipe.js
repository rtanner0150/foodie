let ingredientCount = 0;
document.getElementById('addIngredient').addEventListener('click', () => {
  console.log('click addIngredient');
  ingredientCount++;
  let ingRow = document.createElement('div');
  ingRow.setAttribute('class', 'ingredientRow');
  ingRow.setAttribute('id', 'ingRow' + ingredientCount);
  document.getElementById('add').append(ingRow);
  ingRow.innerHTML = `<input type="text" id="ingredient${ingredientCount}" name="ingredient" placeholder="eggs">
    <input type="text" id="amount${ingredientCount}" name="amount" placeholder="2 large">
    <input type="text" id="substitutions${ingredientCount}" name="substitutions" placeholder="12 oz of applesauce">`;
});

document.getElementById('create-recipe').addEventListener('click', () => {
  let title = document.getElementById('recipeTitle').value;
  let times = document.getElementById('times').value;
  let summary = document.getElementById('summary').value;
  let directions = document.querySelector('#editor .ql-editor').innerHTML;
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
    createRecipe(title, ingredients, times, directions, summary, imagePath).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  });
  
});