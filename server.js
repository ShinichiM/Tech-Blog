const express = require('express');
const app = express();
require('dotenv').config(); 
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
    });