const express = require('express');
const app = express();
require('dotenv').config(); 
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;
const routes = require('./controllers')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
    });