const Sib = require('sib-api-v3-sdk');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

exports.forgotpassword = async (req,res,next)=>{

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.SIB_API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
        email: 'aditya72024@gmail.com',
    }
    const receivers = [{
        email: req.body.data.email,

    }]

    try{
        await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'test',
            textContent: 'test'
        })

        res.status(201).json({success:true});
    
    }catch(err){
        res.status(500).json({success:false});

    }



}