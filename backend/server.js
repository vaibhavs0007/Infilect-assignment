require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;

let counter = 0;
app.get('/metrics', (req, res) => {
  counter++;
  res.json({
    cpu_usage: (Math.random() * 100).toFixed(2),
    memory_usage: (Math.random() * 100).toFixed(2),
    latency_ms: (Math.random() * 100).toFixed(2),
    request_counter: counter,
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
