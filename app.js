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
const Order = require('./models/orders');
const forgotPasswordRequests = require('./models/forgotpasswordrequests');

const passwordRoutes = require('./routes/password');
app.use('/password',passwordRoutes);

const userRoutes = require('./routes/user');
app.use('/user',userRoutes);

const expenseRoutes = require('./routes/expense');
app.use(expenseRoutes);

const purchaseRoutes = require('./routes/purchase');
app.use(purchaseRoutes);


forgotPasswordRequests.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(forgotPasswordRequests)

Expenses.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Expenses);

User.hasMany(Order);
Order.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

sequelize.sync().then(result => {

    app.listen(5000);

}).catch(err => {
    console.log(err)
})

