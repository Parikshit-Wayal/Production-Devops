const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Points directly to orders.js in the same folder
app.use('/api/orders', require('./orders.js'));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Orders Service running on port ${PORT}`));
