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

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: true }) 
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Failed to sync database:', err));