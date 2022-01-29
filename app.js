//jslint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://ritika:ritika@cluster0.x12mv.mongodb.net/usersDBTT", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res) {
    res.render("home");
});


// signup routes

app.get("/signup", function(req, res) {
    res.render("signup");
});

app.post("/signup", function(req, res) {
    const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render("home");
        }
    });
});


// login routes

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res) {
    const email = req.body.useremail;
    const password = req.body.password;

    User.findOne({useremail: email}, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            if(foundUser) {
                if(foundUser.password === password) {
                    res.render("home");
                } else {
                    res.render("login");
                }
            }
        }
    });
});




app.listen(3000, function() {
    console.log("Server started on port 3000");
});
