const Razorpay = require('razorpay');
const Order = require('../models/orders');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

exports.purchasePremimum = async (req,res,next) => {
    
    
    try{

        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const amount = 2500;
        const order = await rzp.orders.create({amount, currency: "INR"}).catch(err => console.log(JSON.stringify(err)));
        const response = await req.user.createOrder({orderId: order.id, status: 'PENDING'}).catch(err => console.log(err));
        return res.status(201).json({order, key_id:rzp.key_id});
        
        // rzp.orders.create({amount, currency: "INR"}, (err, order) => {
        //     if(err){
        //         throw new Error(JSON.stringify(err));
        //     }
        //     req.user.createOrder({orderId: order.id, status: 'PENDING'}).then(() => {
                
        //     }).catch(err => {
        //         throw new Error(err)
        //     })

        // })
        
    }catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }
}


exports.updateTransactionStatus = async (req,res,next) => {
    try{
        const {payment_id, order_id} = req.body;
     

        const order = await Order.findOne({where: {orderId: order_id}}).catch(err => console.log(err));
        let afterOrderPromises = await Promise.all([ order.update({paymentId: payment_id, status: 'SUCCESSFUL'}), req.user.update({ispremiumuser: true})]).catch(err => console.log(err));
        return res.status(202).json({success: true, message: "Transaction Sucessful"});

        // Order.findOne({where: {orderId: order_id}}).then(order=>{
          
        //     order.update({paymentId: payment_id, status: 'SUCCESSFUL'}).then(()=>{
        //         req.user.update({ispremiumuser: true}).then(()=>{
        //             return res.status(202).json({success: true, message: "Transaction Sucessful"});
        //         }).catch((err)=>{
        //             throw new Error(err);
        //         })
        //     }).catch((err)=>{
        //         throw new Error(err);
        //     })
        // })
    }catch(err){
        res.status(500).json({error: err})
    }
}

