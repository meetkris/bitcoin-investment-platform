require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/properties');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/property', propertyRoutes); // For single property access if needed, though usually handled in same route file
app.use('/api/auth', authRoutes);
app.use('/api/tours', require('./routes/tours'));

app.get('/', (req, res) => {
  res.send('Real Estate API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
