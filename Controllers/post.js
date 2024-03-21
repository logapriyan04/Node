const Post = require("../Modules/post");

exports.getPosts = (req, res) => {
  res.json({
    posts: [{ title: "First post" }, { title: "Second post" }],
  });
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      name: req.body.name,
      adress: req.body.adress,
      email: req.body.email,
    });
    res.status(201).json({
      message: "New post added",
      data: newPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
    console.log("hello", err);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json({ data: post });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
    console.log("Error:", err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json({
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
    console.log("Error:", err);
  }
};
exports.verifyToken = (req, res) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const tokenValue = token.split(" ")[1];

  jwt.verify(tokenValue, process.env.YOUR_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }

      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    //console.log('Decoded token:', decoded);
    res.status(200).json({ message: "Token verified successfully" });
  });
};
