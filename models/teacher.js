var mongoose = require("mongoose");

var teacherSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
//    cost: Number,
   location: String,
   lat: Number,
   lng: Number,
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
teacherSchema.index({
    name: 'text',
    description: 'text',
    location: 'text',
    comments: 'text'
});

module.exports = mongoose.model("Teacher", teacherSchema);