const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  adress:{
    type: String,
  },
  email:{
    type: String, 
  },
 
});

module.exports = mongoose.model("Post", postSchema);
