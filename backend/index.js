const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let logs = [];

function addLog(message) {
  const logMsg = `[${new Date().toLocaleTimeString()}] ${message}`;
  logs.push(logMsg);
  console.log(logMsg);
}

const passwordSchema = new mongoose.Schema({
  password: { type: String, required: true },
  strength: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Password = mongoose.model('Password', passwordSchema);

app.post('/api/passwords', async (req, res) => {
  try {
    const { password, strength, score } = req.body;

    addLog(`Password checked → Strength: ${strength}, Score: ${score}`);

    res.status(201).json({
      message: 'Password evaluation saved successfully!',
      data: { password, strength, score }
    });

  } catch (error) {
    addLog(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/health', (req, res) => {
  addLog("Health API called");
  res.status(200).json({ status: 'OK' });
});

app.get('/logs', (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => {
  addLog(`Server running on port ${PORT}`);
});
