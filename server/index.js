// Q1nkWUVzBZPU5eaj;
// mongodb+srv://sagarmanchakatla01:Q1nkWUVzBZPU5eaj@cluster0.ufjo7.mongodb.net/


require('dotenv').config({ path: './database/.env' });
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Routes
app.use("/", require("./Routes/authroutes"));

app.get("/", (req, res) => {
  res.end("hello vedant");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
