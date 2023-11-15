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
