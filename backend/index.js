const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection (Optional: using local for now or skipping strict connection check if not set up)
// mongoose.connect('mongodb://localhost:27017/password-strength', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

const passwordSchema = new mongoose.Schema({
  password: { type: String, required: true },
  strength: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Password = mongoose.model('Password', passwordSchema);

// Endpoint to save a checked password
app.post('/api/passwords', async (req, res) => {
  try {
    const { password, strength, score } = req.body;
    
    // Create new password entry
    // const newPassword = new Password({ password, strength, score });
    // await newPassword.save();
    
    // Since MongoDB might not be running locally, we will just return success for the mockup.
    // Uncomment above lines if MongoDB is guaranteed to run.

    res.status(201).json({ message: 'Password evaluation saved successfully!', data: { password, strength, score } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
