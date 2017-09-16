var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        displayName: req.body.dispayName,
        password: req.body.password
    });
    if(req.body.adminCode === process.env.ADMIN_CODE) {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Greetings " + req.body.username);
           res.redirect("/teachers"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/teachers",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to T-Rated!'
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged Out");
   res.redirect("/teachers");
});


module.exports = router;