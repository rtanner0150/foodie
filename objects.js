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
        //title of post
        this.title = title;
        //contents of post
        this.description = description;
        //shared image (optional)
        this.picture = picture;
        //shared recipe (optional)
        this.recipe = recipe;
        //gets current user for setting author of post
        //this.author = getUser();
        //gets current date for new posts
        this.datePosted = new Date();
    }

    addPost() {
        //adds new blogpost to collection of blogposts
    }

    removePost() {
        //removes from collection
    }

    editPost() {
        //edits data in existing post
    }

    sharePost() {
        //shares post to current user's feed
    }

    createComment() {
        //adds comment by current user
    }

    upvote() {
        //upvote post
    }

    downvote() {
        //downvote post
    }
}

class Recipe {
    
    constructor (title, prepTime, ingredients, tags, directions, story = null, substitutions = null, image = null){
        //title of recipe
        this.title = title;
        //prep/cook time
        this.prepTime = prepTime;
        //ingredients list (collection of Ingredient objects?)
        this.ingredients = ingredients;
        //tags: categories/cuisines/keywords
        this.tags = tags; 
        //recipe directions
        this.directions = directions; 
        //"story" about recipe (anecdotal info related to recipe) (optional)
        this.story = story;
        //possible ingredient substitutions (optional)
        this.substitutions = substitutions; 
        //image related to recipe (optional)
        this.image = image;
    }

    createRecipe() {
        //adds new recipe to collection of Recipe objects
    }

    editRecipe() {
        //edits data in existing recipe
    }

    deleteRecipe() {
        //removes from collection
    }

    shareRecipe() {
        //shares recipe to current user's feed
    }

    commentRecipe() {
        //adds comment by current user
    }

    rateRecipe() {
        //adds rating to recipe from current user
    }
}

class User {

    constructor (username, password, email, profile, pantry){
        this.username = username;
        this.password = password;
        this.email = email;
        //collection of profile related objects?
        this.profile = profile;
        //collection of PantryItem or Ingredient objects that a user has
        this.pantry = pantry;
    }

    createUser() {
        //adds new user to collection of users
    }   

    deletUser() {
        //removes user
    }

    login() {
        //logs in user based on given parameters
    }

    logout() {
        //logs out current user
    }

}