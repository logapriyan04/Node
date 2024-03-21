const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const Post = require("./routes/post");
const User = require("./routes/user");
const { dbConnect } = require("./Config/dbconnect");

require("dotenv").config();
dbConnect();

app.use(express.json());
app.use(bodyParser.json());
app.use("/", Post);
app.use("/", User);

port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
