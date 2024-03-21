const User = require("../Modules/user");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hashedpassword = bcrypt.hash(myPlaintextPassword, salt);
    const newUser = new User({
      username: username,
      password: password,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Error registering user",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, password } = user;

    res.status(200).json({ username, password });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      message: "Error retrieving user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userID);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Error deleting user",
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.YOUR_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
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
