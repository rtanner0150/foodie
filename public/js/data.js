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