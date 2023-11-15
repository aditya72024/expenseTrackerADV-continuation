const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expenses = sequelize.define('expenses',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },
    expense: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,

    },
    category: {
        type: Sequelize.ENUM,
        values: ['Rent','Fooding','Extras'],
        allowNull: false,

    },

    
});

module.exports = Expenses;