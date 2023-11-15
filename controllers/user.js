const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = async (req, res, next) => {
    try{
        if(!req.body.data.username && !req.body.data.email && !req.body.data.password ){
            throw new Error('All details are mandatory!!!');
        }

        const {username,email,password} = req.body.data;

        bcrypt.hash(password, saltRounds, async (err,hash)=>{
            console.log(err);
            await User.create({username, email, password : hash})
            res.status(201).json({success: "User created successfully!!!"});
        })

    }catch(err){
        res.status(500).json({error:err})

    }
}

exports.login = async (req, res, next) => {
    try{
        if(!req.body.data.email && !req.body.data.password ){
            throw new Error('All details are mandatory!!!');
        }

        const email = req.body.data.email;
        const password = req.body.data.password;

        const data = await User.findAll({where : {email:email}});

        console.log(data);

        if(data.length == 0){
            res.status(404).json({error:"User not found!!!"});
        }
        
        bcrypt.compare(password, data[0].password, function(err, result) {

            if(err){
                throw new Error('Something went wrong!!!');
            }

            if(result === true){
                res.status(201).json({success:"User login sucessful!!!"})
            }else{
                res.status(401).json({error:"User not authorized!!!"});
            }
            
        });
        

    }catch(err){
        res.status(500).json({error:err})

    }
}
