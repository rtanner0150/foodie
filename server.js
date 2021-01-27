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
const fileupload = require('express-fileupload');
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
app.use(fileupload())

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
        recipe.summary = updatedRecipe.summary;
        recipe.created_by = updatedRecipe.created_by;
        try{
            recipe.save();
            response.sendStatus(200);
        } catch{
            response.sendStatus(500);
        }
    })
});
//search recipes for given query on given category
app.get('/recipes/search/:on/:query', (request, response) => {
    var regex = new RegExp(request.params.query, 'gi');
    let prop = request.params.on;
    let query = {};
    query[prop] = regex;
    Recipe.find(query, (err, recipes) => {
        if (err) return console.error(err);
        response.send(recipes);
    })
});
//search recipes by ingredient
// app.get('/recipes/search_ingredient/:query', (request, response) => {
//     var regex = new RegExp(request.params.query, 'gi');
//     Recipe.find({'ingredients.name': regex}, (err, recipes) => {
//         if (err) return console.error(err);
//         response.send(recipes);
//     })
// })

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
//get specific user by id
app.get('/users/:id', (request, response) => {
    User.findOne({_id: request.params.id}).exec((err, user) => {
        if (err) return console.error(err);
        response.send(user);
    })
})

//get saved recipes for specific user
app.get('/users/:id/recipes', (request, response) => {
    
    User.findOne({_id: request.params.id}).exec().then(user => {
        findSavedRecipes(user).then(recipes => {
            response.send(recipes);
        });
    })

    async function findSavedRecipes(user){
        let recipes = [];
        for (let i = 0; i < user.saved_recipes.length; i++){
            await Recipe.findOne({_id: user.saved_recipes[i].recipe_id}).exec().then(recipe => {
                recipes.push(recipe)
            });
        }
        return recipes;
    }
})

//handle img upload: https://flaviocopes.com/file-upload-using-ajax/
app.post('/saveImage', (request, response) => {
    const fileName = request.files.image.name;
    const path = __dirname + '/public/img/upload/' + fileName;

    request.files.image.mv(path, (error) => {
        if (error) {
            console.error(error);
            response.writeHead(500, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify({status: 'error', message: error}))
            return;
        }

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({status: 'success', path: 'img/upload/' + fileName}))
    })
})