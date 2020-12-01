const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");

    /* ingredient schema (schema inside schema) */
    const ingredientSchema = new mongoose.Schema({
        name : String,
        amount : String, 
        substitutions : String, 
    });

    const Ingredient = mongoose.model("Ingredient", ingredientSchema);


    /* recipe schema */
    const recipeSchema = new mongoose.Schema({
        title : String, 
        ingredients : [ingredientSchema], /* a schema inside a schema */
        prep_cook_time : String,
        directions : String, 
        picture : String,
        video : String,
        quality_rating : Number,
        difficulty_rating : Number
        /* comments : [commentSchema] */
    }); 

    const Recipe = mongoose.model('Recipe', recipeSchema);

     /* saved recipe schema */
    const savedRecipeSchema = new mongoose.Schema({
        recipe_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        favorited: Boolean
    });

    const SavedRecipe = mongoose.model('SavedRecipe', savedRecipeSchema);
       
    /* user profile schema */
    const userProfileSchema = new mongoose.Schema ({
        username : String, 
        password : String, 
        email : String, 
        profile_pic : String, 
        saved_recipes : [savedRecipeSchema]
        /* karma_system : Number */
    })

    const UserProfile = mongoose.model('UserProfile', userProfileSchema);

}); //once