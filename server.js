const express = require('express');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const hospitalRoutes = require('./routes/hospitalRoutes');
const authRoutes = require('./routes/authRoutes');

require('./config/passport')(passport);

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(passport.initialize());

app.get('/', (request, response) => {
    response.status(200).json({ message: 'Welcome to Hospital APIs' });
});

app.use('/', authRoutes);
app.use('/hospitals', hospitalRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});