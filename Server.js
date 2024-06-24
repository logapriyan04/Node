const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
  dist_path = path.join(__dirname, "dist", "index.html");
  console.log(dist_path);
  res.sendFile(dist_path);
});

app.listen(5173, () => {
  console.log("UME Server Started");
});
