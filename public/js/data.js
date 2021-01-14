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