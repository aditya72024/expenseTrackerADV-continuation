const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const forgotPasswordRequests = sequelize.define('forgotpasswordrequests',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },

    isactive: Sequelize.BOOLEAN,

});


module.exports = forgotPasswordRequests;