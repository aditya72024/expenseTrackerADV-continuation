const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');
app.use('/user',userRoutes);

const expenseRoutes = require('./routes/expense');
app.use(expenseRoutes);

// app.use(errorController.get404);

sequelize.sync().then(result => {

    app.listen(5000);

}).catch(err => {
    console.log(err)
})

