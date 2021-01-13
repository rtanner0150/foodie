const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://foodieDB:OnionsAndGarlic1@foodiecluster.wtnzu.mongodb.net/FoodieDatabase?retryWrites=true&w=majority';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe.js');
const User = require('./models/User.js');
const Ingredient = require('./models/Ingredient.js');
const SavedRecipe = require('./models/SavedRecipe.js');
const { allowedNodeEnvironmentFlags } = require('process');
const { createCipher } = require('crypto');

let port = process.env.PORT || 3000;

const dbCheck = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log(dbCheck);
}).catch(err => console.error(err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port, () => {
    console.log('The Express server is running at port ' + port);
});

//RECIPES
//get all recipes
app.get('/recipes', (request, response) => {
    Recipe.find((err, recipes) => {
        if (err) return console.error(err);
        response.send(recipes);
    })
});
//create new recioe
app.post('/recipes', (request, response) => {
    let r = new Recipe(request.body);
    r.save((err, r) => {
        if (err){
            response.sendStatus(409);
            return console.error(err);
        }
        response.sendStatus(201);
    })
});
//delete recipe by id
app.delete('/recipes/:id', async (request, response) => {
    Recipe.deleteOne({_id: request.params.id})
    .then(() => response.sendStatus(204))
    .catch(() => response.sendStatus(404));
});
//update recipe by id
app.put('/recipes/:id', async(request, response) => {
    let updatedRecipe = new Recipe(request.body);
    Recipe.findOne({_id: request.params.id}).exec((err, recipe) => {
        if (err) return console.error(err);
        recipe.title = updatedRecipe.title;
        recipe.ingredients = updatedRecipe.ingredients;
        recipe.prep_cook_time = updatedRecipe.prep_cook_time;
        recipe.directions = updatedRecipe.directions;
        recipe.picture = updatedRecipe.picture;
        recipe.video = updatedRecipe.video;
        recipe.quality_rating = updatedRecipe.quality_rating;
        recipe.difficulty_rating = updatedRecipe.difficulty_rating;
        try{
            recipe.save();
            response.sendStatus(200);
        } catch{
            response.sendStatus(500);
        }
    })
});

//USERS
//get all users
app.get('/users', (request, response) => {
    User.find((err, users) => {
        if (err) return console.error(err);
        response.send(users);
    })
});
//create new user
app.post('/users', (request, response) => {
    let u = new User(request.body);
    u.save((err, u) => {
        if (err){
            response.sendStatus(409);
            return console.error(err);
        }
        response.sendStatus(201);
    })
});
//update user by id
app.put('/users/:id', (request, response) => {
    let updatedUser = new User(request.body);
    User.findOne({_id: request.params.id}).exec((err, user) => {
        if (err) return console.error(err);
        user.username = updatedUser.username;
        user.password = updatedUser.password;
        user.email = updatedUser.email;
        user.profile_pic = updatedUser.profile_pic;
        user.saved_recipes = updatedUser.saved_recipes;
        try{
            user.save();
            response.sendStatus(200);
        } catch{
            response.sendStatus(500);
        }
    })
});

//INGREDIENTS
//get all ingredients
app.get('/ingredients', (request, response) => {
    Ingredient.find((err, ingredients) => {
        if (err) return console.error(err);
        response.send(ingredients);
    })
});

//SAVED RECIPES
//get all saved recipes for a specific user
// app.get('/savedRecipes', (request, response) => {
//     SavedRecipe.find((err, sr) => {
//         if (err) return console.error(err);
//         response.send(sr);
//     })
// });