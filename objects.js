/*

- Blog Post
    -- Properties
        - Author
        - Date Posted
        - Title
        - Description
        - Picture (optional)
        - Recipe (optional)
    -- Methods
        - Create/Add (user, mod)
        - Remove (user, mod)
        - Edit  (user, mod)
        - Share (user)
        - Comment (user)
        - Upvote/Downvote (user)

  - Recipe
    -- Properties
        - Title
        - Tags
        - Prep/Cook Time
        - Ingredients
        - Recipe Story
        - Recipe Summary
        - Substitutions (optional)
        - Image (optional)
    -- Methods
        - Create/Add (user, mod)
        - Remove (user, mod)
        - Edit  (user, mod)
        - Share (user)
        - Comment (user)
        - Rate (user)

  - User
    -- Properties
        - Username
        - Password
        - Email Address
        - Profile
        - Pantry Items (ingredients)
    -- Methods
        - Create (non-user)
        - Delete (user)
        - Login (non-user)
        - Logout (user)
        
  - Profile

*/

class BlogPost {

    constructor(title, description, picture = null, recipe = null) {
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.recipe = recipe;
        //this.author = getUser();
        this.datePosted = new Date();
    }

    addPost() {

    }

    removePost() {

    }

    editPost() {

    }

    sharePost() {

    }

    createComment() {

    }

    vote() {
        
    }
}

class Recipe {
    
    constructor (title, prepTime, ingredients, tags, directions, story = null, substitutions = null, image = null){
        this.title = title;
        this.prepTime = prepTime;
        this.ingredients = ingredients;
        this.tags = tags; 
        this.directions = directions; 
        this.story = story;
        this.substitutions = substitutions; 
        this.image = image;
    }

    createRecipe() {

    }

    editRecipe() {

    }

    deleteRecipe() {

    }

    shareRecipe() {

    }

    commentRecipe() {

    }

    rateRecipe() {

    }
}

class User {

    constructor (username, password, email, profile, pantry){
        this.username = username;
        this.password = password;
        this.email = email;
        this.profile = profile;
        this.pantry = pantry;
    }

    createUser() {

    }   

    deletUser() {

    }

    login() {

    }

    logout() {
        
    }

}