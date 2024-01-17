const Sib = require('sib-api-v3-sdk');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const Forgotpasswordrequest = require('../models/forgotpasswordrequests');
const User = require('../models/user.js');
const path = require('path');
const rootDir = require('../util/path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const sequelize = require('../util/database');


exports.forgotpassword = async (req,res,next)=>{

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.SIB_API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
        email: 'pawanojha509@gmail.com',
    }
    const receivers = [{
        email: req.body.data.email,

    }]

    try{

        const user = await User.findOne({where: {email: req.body.data.email}});
        const data = await user.createForgotpasswordrequest({isactive: 1});
        
        await tranEmailApi.sendTransacEmail({
             sender,
             to: receivers,
             subject: 'test',
             textContent: `http://localhost:5000/password/resetpassword/{{params.reqId}}`,
             params : {
                reqId : data.id,
             }
         })

        res.status(201).json({success:true});
    
    }catch(err){
        res.status(500).json({success:false});

    }



}

exports.resetpassword = async (req,res,next)=>{

    

    try{
        const request = await Forgotpasswordrequest.findOne({where: {id: req.params.id}});
        if(request.isactive != 1){
            res.status(500).json({success:false});
        }else{
            //res.status(201).json({success:true});
            res.sendFile(path.join(rootDir,'reset-password.html'));
        }
    }catch(err){
        res.status(500).json({success:false});
    }

}


exports.updatepassword = async (req, res, next) => {

    const t = await sequelize.transaction();

    try{
    
    const userData = await Forgotpasswordrequest.findOne({where: {id: req.body.data.id}}) 

    const password = req.body.data.password;

    if(userData.isactive != 1){
        throw new Error('Link Expired!');
    }

    console.log(userData)

    bcrypt.hash(password, saltRounds, async (err,hash)=>{
        
      
             await Promise.all[User.update({password: hash}, {where: {id: userData.userId}},{transaction: t}), Forgotpasswordrequest.update({isactive: 0}, {where: {id: req.body.data.id}}, {transaction: t}) ];
             await t.commit();
             res.status(201).json({success: "User password updated successfully!!!"});
            
 })

}catch(err){   
    await t.rollback();
    res.status(500).json({error:err})
}


}