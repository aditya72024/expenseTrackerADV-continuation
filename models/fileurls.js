const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Fileurls = sequelize.define('fileurls',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fileurl: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    
});


module.exports = Fileurls;