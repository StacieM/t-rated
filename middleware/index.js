var Comment = require("../models/comment");
var Teacher = require("../models/teacher");
module.exports = {
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash("error", "Please sign in");
      res.redirect("/login");
  },
  checkUserTeacher: function(req, res, next){
      if(req.isAuthenticated()){
        Teacher.findById(req.params.id, function(err, teacher){
             if(teacher.author.id.equals(req.user._id) || req.user.isAdmin){
                 next();
             } else {
                 req.flash("error", "You do not have permission to do that");
                 console.log("BADD!!!");
                 res.redirect("/teachers/" + req.params.id);
             }
          });
      } else {
          req.flash("error", "Please sign in");
          res.redirect("/login");
      }
  },
  checkUserComment: function(req, res, next){
      if(req.isAuthenticated()){
          Comment.findById(req.params.commentId, function(err, comment){
             if(comment.author.id.equals(req.user._id) || req.user.isAdmin){
                 next();
             } else {
                 req.flash("error", "You do not have permission to do that");
                 res.redirect("/teachers/" + req.params.id);
             }
          });
      } else {
          req.flash("error", "Please sign in");
          res.redirect("login");
      }
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash("error", "This site is now read only thanks to spam and trolls.");
      res.redirect("back");
    }
  },
  isSafe: function(req, res, next) {
if(req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
  next();
}else {
  req.flash('error', 'Only images from images.unsplash.com allowed.\nSee https://images.unsplash.com for free image urls.');
  res.redirect('back');
}
}
}