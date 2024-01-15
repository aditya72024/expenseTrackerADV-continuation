const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticate = (req,res,next) => {
    try{
        const token = req.header('authorization');
        
        const user = jwt.verify(token, 'qlJ6Jg(j&Lh');
        console.log(user.userId)
        User.findByPk(user.userId).then(user=>{
            console.log(JSON.stringify(user));
            req.user = user;
         
            next();
        })
    }catch(err){
        return res.status(401).json({success:true})
    }
}


module.exports = {authenticate};