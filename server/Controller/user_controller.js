const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Reminder,Caregiver  } = require("../Model/user_model");

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

const reminder = async (req, res) => {
  const { username, title, type, time, date, repeat } = req.body;

  try {
    const reminder = new Reminder({ username, title, type, time, date, repeat });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReminder = async (req, res) => {
  const { id } = req.params;
  const { title, type, time, date, repeat } = req.body;

  try {
    const reminder = await Reminder.findByIdAndUpdate(
      id,
      { title, type, time, date, repeat, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteReminder = async (req, res) => {
  const { id } = req.params;
  try {
    const reminder = await Reminder.findByIdAndDelete(id);

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find(); // You can filter here based on criteria if needed
    res.json(caregivers);
  } catch (error) {
    console.error('Error fetching caregivers:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Route handler for creating new caregivers
const setCaregivers = async (req, res) => {
  try {
    const newCaregiver = new Caregiver(req.body);
    const savedCaregiver = await newCaregiver.save();
    res.status(201).json(savedCaregiver);
  } catch (error) {
    console.error('Error creating caregiver:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { register, login, reminder, getAllReminders, deleteReminder, updateReminder,fetchCaregivers, setCaregivers };
