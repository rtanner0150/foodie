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
    let recipe = {
        title: title,
        ingredients: ingredients,
        prep_cook_time: times,
        directions: directions,
        summary: summary,
        picture: image,
        tags: tags,
        created_by: '6000c2eed43991ec6f6e2487'
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
    return `Recipe "${recipe.title}" created!
    ${recipe}
    `;
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