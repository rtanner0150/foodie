//global variables
const urlParams = new URLSearchParams(window.location.search);
// const taskId = urlParams.get('id');

//global CRUD functions
async function getRecipes(){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    
    const response = await fetch('/recipes', requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getRecipeById(recipeId){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/recipes/' + recipeId, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getSpecificUser(id){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/users/' + id, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getLoggedInUser(){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/loggedInUser', requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getUserRecipes(id){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/recipes/user/' + id, requestOptions);
    const body = await response.json();
    if (response.status != 200) {
        throw Error(body.message);
    }
    return body;
}

async function searchRecipes(query, on){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    
    const response = await fetch('/recipes/search/' + on + '/' + query, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function createRecipe(title, ingredients, times, directions, summary, image, tags){
    let loggedInId = '';
    await getLoggedInUser().then((user) => {
        loggedInId = user[0]._id;
        console.log('loggedInId: ' + loggedInId);
    });
    let recipe = {
        title: title,
        ingredients: ingredients,
        prep_cook_time: times,
        directions: directions,
        summary: summary,
        picture: image,
        tags: tags,
        created_by: loggedInId
    }
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/recipes', requestOptions);
    if (response.status != 201){
        throw Error('Recipe not created');
    }
    return `Recipe "${recipe.title}" created!`;
}

async function updateRecipe(id, title, ingredients, times, directions, summary, image, tags){
    let recipe = {
        title: title,
        ingredients: ingredients,
        prep_cook_time: times,
        directions: directions,
        summary: summary,
        picture: image,
        tags: tags
    }
    let requestOptions = {
        method: 'PUT',
        body: JSON.stringify(recipe),
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/recipes/' + id, requestOptions);
    if (response.status != 200){
        throw Error('Recipe not updated');
    }
    return `Recipe "${recipe.title}" updated!`;
}

//https://flaviocopes.com/file-upload-using-ajax/
async function handleImageUpload(imageInput){
    const files = imageInput.files;
    if (files.length === 0){
        return null;
    }
    const formData = new FormData();
    formData.append('image', files[0]);

    const response = await fetch('/saveImage', {method: 'POST', body: formData});
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body.path;
}

//global miscellaneous functions
function addIngredientRow(){
    ingredientCount++;
    let ingRow = document.createElement('div');
    ingRow.setAttribute('class', 'ingredientRow');
    ingRow.setAttribute('id', 'ingRow' + ingredientCount);
    document.getElementById('ingredientWrapper').append(ingRow);
    ingRow.innerHTML = `<input type="text" id="ingredient${ingredientCount}" name="ingredient" placeholder="name">
        <input type="text" id="amount${ingredientCount}" name="amount" placeholder="amount">
        <input type="text" id="substitutions${ingredientCount}" name="substitutions" placeholder="substitutions?">`;
}

function removeIngredientRow(){
    if (ingredientCount > 0){
        document.getElementById('ingRow' + ingredientCount).remove();
        ingredientCount--;
    }
}

function uploadRecipe(isEditing){
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
    if (isEditing && document.getElementById('image').files[0] === undefined){
      let imagePath = savedImagePath;
      updateRecipe(urlRecipeId, title, ingredients, times, directions, summary, imagePath, tags).then((result) => {
        document.getElementById('output').innerHTML = result;
      }).catch((error) => {
        document.getElementById('output').innerHTML = error;
      });
    } else if (isEditing && document.getElementById('image').files[0]){
      handleImageUpload(document.getElementById('image')).then((imagePath) => {
        console.log('imagePath: ' + imagePath);
        updateRecipe(urlRecipeId, title, ingredients, times, directions, summary, imagePath, tags).then((result) => {
            document.getElementById('output').innerHTML = result;
        }).catch((error) => {
            document.getElementById('output').innerHTML = error;
        });
      });
    } else {
      handleImageUpload(document.getElementById('image')).then((imagePath) => {
        console.log('imagePath: ' + imagePath);
        createRecipe(title, ingredients, times, directions, summary, imagePath, tags).then((result) => {
            document.getElementById('output').innerHTML = result;
        }).catch((error) => {
            document.getElementById('output').innerHTML = error;
        });
      });
    }
  }