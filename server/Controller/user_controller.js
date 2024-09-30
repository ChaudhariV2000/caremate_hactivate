const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const twilio = require('twilio');

const { User, Reminder, Caregiver, UserLogin } = require("../Model/user_model");

///------------

//-------------------

const register = async (req, res) => {
  const { name, password, number, address, dob } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const newUser = new User({
      username: name,
      password: hashedPassword,
      number: number,
      address: address,
      dob: dob
    });
    await newUser.save();

    res.status(201).send("User registered successfully");

  } catch (error) {
    res.status(400).send(`Error registering user:Check Your Credentials `);
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

    // const patient = await User.findOne({ username })

    // const phoneNumber = patient.number;

    const reminder = new Reminder({ username: username, phoneNumber: "+919860173150", title: title, type: type, time: "2024-09-30T07:21:13.357Z", date: "2024-09-30T07:21:13.357Z", repeat: repeat });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const smsReply = async (req, res) => {
  console.log('Incoming request body:', req.body);
  const messageBody = req.body.Body ? req.body.Body.trim().toLowerCase() : '';
  const fromNumber = req.body.From || '';
  // Handle "YES" or "NO" responses
  if (messageBody === 'yes') {
    console.log(`Acknowledgment received from ${fromNumber}: Medication taken.`);
    res.send('<Response><Message>Thank you for confirming!</Message></Response>');
  } else if (messageBody === 'no') {
    console.log(`Acknowledgment received from ${fromNumber}: Medication not taken.`);
    res.send('<Response><Message>Please remember to take your medication.</Message></Response>');
  } else {
    console.log(`Invalid response received: ${messageBody}`); // Log invalid response
    res.send('<Response><Message>Invalid response. Please reply with "YES" or "NO".</Message></Response>');
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
  const { title, phoneNumber, type, time, date, repeat } = req.body;

  try {
    const reminder = await Reminder.findByIdAndUpdate(
      id,
      { title, phoneNumber, type, time, date, repeat, updatedAt: Date.now() },
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
  console.log("hello")
  const { id } = req.params;
  console.log(req.params.id)
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

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const callUser = async (req, res) => {
  const userPhoneNumber = req.body.phone;
  console.log(userPhoneNumber)
  try {
    const call = await client.calls.create({
      to: userPhoneNumber,
      from: twilioPhoneNumber,
      url: 'https://bbb2-27-0-59-131.ngrok-free.app/voice',
    });

    console.log(`Call initiated: ${call.sid}`);
    res.status(200).send('Call initiated successfully.');
  } catch (error) {
    console.error('Error making the call:', error);
    res.status(500).send('Failed to initiate the call.');
  }
}

const voice = async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Please confirm if you have taken your medication. Press 1 for yes, press 2 for no.');

  twiml.gather({
    numDigits: 1,
    action: '/call-status',
    method: 'POST'
  });
  twiml.redirect('/voice');

  res.type('text/xml');
  res.send(twiml.toString());
}

const callStatus = async (req, res) => {
  const digit = req.body.Digits;
  const twiml = new twilio.twiml.VoiceResponse();

  if (digit === '1') {
    twiml.say('Thank you for confirming. Your medication has been recorded. Goodbye.');

    try {
      const updatedRecord = await Reminder.findOneAndUpdate(
        { phoneNumber: req.body.To, taken: false }, // Find the record where `taken` is false
        { taken: true }, // Update the `taken` field to true
        { new: true } // Return the updated document
      );

      if (updatedRecord) {
        console.log(`Medication for ${req.body.To} marked as taken.`);
      } else {
        console.log(`No pending medication record found for ${req.body.To}.`);
      }
    } catch (error) {
      console.error('Error updating the medication record:', error);
    }

  } else if (digit === '2') {
    twiml.say('Please remember to take your medication. Goodbye.');
  } else {
    twiml.say('Invalid input. Goodbye.');
  }


  twiml.hangup();

  res.type('text/xml');
  res.send(twiml.toString());
}

module.exports = { register, login, reminder, getAllReminders, deleteReminder, updateReminder, fetchCaregivers, setCaregivers, smsReply, callUser, voice, callStatus };
