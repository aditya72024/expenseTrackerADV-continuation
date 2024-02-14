const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');

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
const Fileurl = require('./models/fileurls');
const forgotPasswordRequests = require('./models/forgotpasswordrequests');

const passwordRoutes = require('./routes/password');
app.use('/password',passwordRoutes);

const userRoutes = require('./routes/user');
app.use('/user',userRoutes);

const expenseRoutes = require('./routes/expense');
app.use(expenseRoutes);

const purchaseRoutes = require('./routes/purchase');
app.use(purchaseRoutes);

app.use((req,res) => {
    res.sendFile(path.join(__dirname, $(req.url)));
})

app.use(helmet());
app.use(compression());

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),{flag:'a'});


app.use(morgan('combined', {stream: accessLogStream}));




Fileurl.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Fileurl)

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

