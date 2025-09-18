const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/user_model");

const register = async (req, res) => {
  const { name, password, number, address, dob, imageUrl } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(String(password), 10);
    const newUser = new User({
      username: name,
      password: hashedPassword,
      number,
      address,
      dob,
      imageUrl
    });
    await newUser.save();

    const token = jwt.sign({ User: newUser }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.username,
        number: newUser.number,
        address: newUser.address,
        imageUrl: newUser.imageUrl,
        dob: newUser.dob
      }
    });
  } catch (error) {
    res.status(400).send(`Error registering user: Check Your Credentials`);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send("Invalid username or password");

    const isPasswordValid = await bcrypt.compare(String(password), user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid username or password");

    const token = jwt.sign({ User: user }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.username,
        number: user.number,
        address: user.address,
        imageUrl: user.imageUrl,
        dob: user.dob,
        age: user.age
      }
    });
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getProfile };