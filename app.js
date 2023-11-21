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

const Expenses = require('./models/expenses');
const User = require('./models/user');


const userRoutes = require('./routes/user');
app.use('/user',userRoutes);

const expenseRoutes = require('./routes/expense');
app.use(expenseRoutes);


Expenses.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Expenses);


sequelize.sync().then(result => {

    app.listen(5000);

}).catch(err => {
    console.log(err)
})

