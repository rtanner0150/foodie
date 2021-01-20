let ingredientCount = 0;
function addIngredient() {
  ingredientCount++;
  document.getElementById("add").innerHTML += `
  <div class="ingredientRow">
    <input type="text" id="ingredient${ingredientCount}" name="ingredient" placeholder="eggs">
    <input type="text" id="amount${ingredientCount}" name="amount" placeholder="2 large">
    <input type="text" id="substitutions${ingredientCount}" name="substitutions" placeholder="12 oz of applesauce">
  </div>
  `;
}

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
  createRecipe(title, ingredients, times, directions, summary).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
});