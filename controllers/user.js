const User = require('../models/user');

exports.signup = async (req, res, next) => {
    try{
        if(!req.body.data.username && !req.body.data.email && !req.body.data.password ){
            throw new Error('All details are mandatory!!!');
        }

        const username = req.body.data.username;
        const email = req.body.data.email;
        const password = req.body.data.password;

        const data = await User.create({
            username: username,
            email: email,
            password: password
        });

        res.status(201).json(data);

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
        }else if(password != data[0].dataValues.password){
            res.status(401).json({error:"User not authorized!!!"});
        }else{
            res.status(201).json({success:"User login sucessful!!!"})
        }
        

        // res.status(201).json(data);

    }catch(err){
        res.status(500).json({error:err})

    }
}
