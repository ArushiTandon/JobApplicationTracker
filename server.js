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

const staticPages = [
    { route: '/user/login', folder: 'login' },
    { route: '/user/signup', folder: 'signup' },
    { route: '/profile', folder: 'profile' },
    { route: '/dashboard', folder: 'dashboard' },
    { route: '/jobs', folder: 'jobs' },
    { route: '/notes', folder: 'notes' },
    { route: '/reminder', folder: 'reminder' },
    { route: '/jobApplication', folder: 'jobApplication' }
  ];
  
  staticPages.forEach(({ route, folder }) => {
    app.get(route, (req, res) => {
      res.sendFile(path.join(__dirname, 'public', folder, `${folder}.html`));
    });
  });

app.use('/api/user', userRoutes);
app.use('/dashboard', dashboardRoutes)
app.use('/jobs', jobRoutes)
app.use('/notes', notesRoutes);
app.use('/api/reminder', reminderRoutes);
app.use('/jobApplication', jobApplicationRoutes)



sequelize.sync({ alter: false }) 
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Failed to sync database:', err));