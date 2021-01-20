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

async function searchRecipesByTitle(query){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    
    const response = await fetch('/recipes/search_title/' + query, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function searchRecipesByIngredient(query){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    
    const response = await fetch('/recipes/search_ingredient/' + query, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function createRecipe(title, ingredients, times, directions, summary){
    let recipe = {
        title: title,
        ingredients: ingredients,
        prep_cook_time: times,
        directions: directions,
        summary: summary,
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
    return true;
}