const express = require('express');
const path = require('path');
const sequelize = require('./util/db');
const passport = require('./middleware/auth');
const cors = require('cors');
require('./model/associations');
require("./cron/reminder");
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;
 

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const jobRoutes = require('./routes/jobRoutes');
const notesRoutes = require('./routes/notesRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');



app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup', 'signup.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile', 'profile.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard', 'dashboard.html'));
});

app.get('/jobs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'jobs', 'jobs.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes', 'notes.html'));
});

app.get('/reminder', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reminder', 'reminder.html'));
});

app.get('/jobApplication', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'jobApplication', 'jobApplication.html'));
});


app.use('/api/user', userRoutes);
app.use('/dashboard', dashboardRoutes)
app.use('/jobs', jobRoutes)
app.use('/notes', notesRoutes);
app.use('/reminder', reminderRoutes);
app.use('/jobApplication', jobApplicationRoutes)



sequelize.sync({ alter: false }) 
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Failed to sync database:', err));