const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/user_model");

const register = async (req, res) => {
  const { username, password } = req.body;

  console.log(username)
  try {
    const hashedPassword = await bcrypt.hash(String(password), 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(`Error registering user: ${error.message}`);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log(username)
  try {
    const user = await User.findOne({ username });
    console.log("find")
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(String(password), user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign({ User: user }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
    console.log("hi")
  }
};

module.exports = { register, login };
