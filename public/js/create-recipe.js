let ingredientCount = 0;
document.getElementById('addIngredient').addEventListener('click', addIngredientRow);
document.getElementById('removeIngredient').addEventListener('click', removeIngredientRow);

console.log('add click listener to create-recipe');
document.getElementById('create-recipe').addEventListener('click', () => {
  uploadRecipe(false);
});
