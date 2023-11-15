const Sequelize = require('sequelize');
const sequelize = new Sequelize('expensetrackeradv','root','root',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;