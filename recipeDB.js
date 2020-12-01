const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");

    /* ingredient schema (schema inside schema) */
    /* this schema goes first becuase we need to declare the schemas that go inside of schemas first
        this is because it is read from the top of the code to the bottom, line by line. it is 
        not read all at once.  */
    const ingredientSchema = new mongoose.Schema({
        name : String,
        amount : String, 
        substitutions : String, 
    });

    const Ingredient = mongoose.model("Ingredient", ingredientSchema);


    /* recipe schema */
    //this schema references the ingredient schema
    //the ingredient property is an array of Ingredient objects
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
     //SavedRecipe references a Recipe by ID
     //hopefully this works
    const savedRecipeSchema = new mongoose.Schema({
        recipe_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        favorited: Boolean
    });

    const SavedRecipe = mongoose.model('SavedRecipe', savedRecipeSchema);
       
    /* user profile schema */
    //saved_recipes property is an array of SavedRecipe objects
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

/* 
    KS: if we want to include charts, graphs, images, or other large objects, we use XML
    with JSON we ONLY use data types. 
        the main reason we are choosing json over xml is that JSON uses multiple different formats of data: 
        we're only going to use strings, numbers, and sometimes boolean.
    you don't want to mix XML and JSON (derulo)  
    with this type of database, we are only able to format in BSON */

/*  

    RT: Another benefit of using JSON over XML when creating data schemas is the fleixibility that the JSON format provides.
    JSON format allows us to handle data uncertainty as it gives us the ability to add/remove properties on the fly, instead
        of being limited to what we defined at schema creation.
    /mic drop
*/