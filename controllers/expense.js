const Expense = require('../models/expenses');
const User = require('../models/user');
const Fileurl = require('../models/fileurls');
const sequelize = require('../util/database');
var AWS = require('aws-sdk');
var moment = require('moment');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const Math = require('mathjs');  


exports.getIndex = async (req,res,next) => {
    try{

        let ITEMS_PER_PAGE  = +req.query.noofrows;
        const page = +req.query.page;
        let totalItems;
        
        const totalCountExpenses = await req.user.countExpenses();

        totalItems = totalCountExpenses;
        
        const data = await req.user.getExpenses({
            offset : (page-1) * ITEMS_PER_PAGE,
            limit : ITEMS_PER_PAGE
        })

        const totalExpenses = req.user.totalExpense; 

        res.status(201).json({
            data: data,
            totalExpenses: totalExpenses,
            totalItems: totalItems,
            pageData :{
                currentPage : page,
                hasNextPage: ITEMS_PER_PAGE*page < totalItems,
                nextPage: page+1,
                hasPreviousPage : page > 1,
                previousPage: page-1,
                lastPage: Math.ceil(totalItems/ITEMS_PER_PAGE),
            }

        });

    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
}

exports.addExpense = async (req,res,next) => {
 
    const t = await sequelize.transaction();
    try{

        
        if(!req.body.data.expense){
            throw new Error('Expense is mandatory!');
        }    
        const expense = req.body.data.expense; 
        const description = req.body.data.description; 
        const category = req.body.data.category; 

       
    
        const data = await req.user.createExpense({
            expense : expense,
            description : description,
            category : category
        }, {transaction: t});

        User.update({totalExpense: +(req.user.totalExpense)+ +(expense)}, {where:{id: req.user.id}}, {transaction: t});
        await t.commit();
    
        res.status(201).json(data);
    }catch(err){
        await t.rollback();

        res.status(500).json({success:false, error: err})
    }
}


exports.deleteExpense = async (req,res,next) => {
    const t = await sequelize.transaction();

try{    
    
    const expenseId = req.params.expenseId;

    
    const expense = await req.user.getExpenses({where: {id: expenseId }});
    const expenseAmount = expense[0]['expense'];

    
    const data = await expense[0].destroy({transaction: t});

     User.update({totalExpense: +(req.user.totalExpense)- +(expenseAmount)}, {where:{id: req.user.id}}, {transaction: t});
     await t.commit();


     res.status(201).json(data);
}catch(err){
    await t.rollback();

    res.status(500).json({success:false, error: err})
}



}

exports.downloadHistory = async (req,res,next) => {
    try{
        const data = await req.user.getFileurls({
            attributes: ['fileurl','createdAt'],

            
        });

        res.status(201).json(data)

    }catch(err){
        res.status(500).json({error: err})
    }
}


exports.getLeaderBoard = async (req,res,next) => {
    try{

        const data = await User.findAll({
            attributes: ['username', 'totalExpense'],
            order : [['totalExpense', 'DESC']],
        });

          res.status(201).json(data)

    }catch(err){
        res.status(500).json({error: err})
    }
}

exports.downloadExpenses = async (req,res,next)=>{
    try{

        const expenses = await req.user.getExpenses();
        const stringifiedExpenses = JSON.stringify(expenses);
        const userId = req.user.id;
        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await uploadToS3(stringifiedExpenses, filename);
        await req.user.createFileurl(
            {fileurl : fileURL}
        )
        res.status(201).json({fileURL, success: true})

    }catch(err){
        res.status(500).json({fileURL: '',success: false, err: err})
    }
}

function uploadToS3(data,filename){
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    let s3bucket = new AWS.S3(
        {
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET
        }
    )

    var params = {
        Bucket : process.env.BUCKET_NAME,
        Key : filename,
        Body : data,
        ACL : 'public-read'
    }

    return new Promise((resolve, reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                reject(err)
            }else{
                resolve(s3response.Location)
            }
        })
    })
}


exports.getParticularExpense = async (req,res,next) => {

    try{    
        const expenseId = req.params.expenseId;
        const data = await Expense.findByPk(expenseId);
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({error: err})
    }}

exports.dailyExpenses = async (req,res,next)=>{

    const { Op } = require("sequelize");
    const TODAY_START = moment().format('YYYY-MM-DD 00:00');
    const NOW = moment().format('YYYY-MM-DD 23:59');
    // console.log(TODAY_START);

    try{



         const data = await req.user.getExpenses({
             where: {
               createdAt: { 
                 [Op.between]: [TODAY_START,NOW]
               
             }
            
         },
         attributes: ['expense', 'description', 'category'],
     });

         res.status(201).json(data);


     }catch(err){
        res.status(500).json({error: err});

     }
}    


exports.weeklyExpenses = async (req,res,next)=>{

    const { Op } = require("sequelize");
    const START = moment().startOf('week').format('YYYY-MM-DD 00:00');
    const END = moment().endOf('week').format('YYYY-MM-DD 23:59');
    // console.log(TODAY_START);

    try{



         const data = await req.user.getExpenses({
             where: {
               createdAt: { 
                 [Op.between]: [START,END]
               
             }
            
         },
         attributes: ['expense', 'description', 'category'],
     });

         res.status(201).json(data);


     }catch(err){
        res.status(500).json({error: err});

     }
}    


exports.monthlyExpenses = async (req,res,next)=>{

    const { Op } = require("sequelize");
    const START = moment().startOf('month').format('YYYY-MM-DD 00:00');
    const END = moment().endOf('month').format('YYYY-MM-DD 23:59');
    // console.log(TODAY_START);

    try{



         const data = await req.user.getExpenses({
             where: {
               createdAt: { 
                 [Op.between]: [START,END]
               
             }
            
         },
         attributes: ['expense', 'description', 'category'],
     });

         res.status(201).json(data);


     }catch(err){
        res.status(500).json({error: err});

     }
}    



exports.putExpense = async (req,res,next) => {

        try{    
            
            const expenseId = req.params.expenseId;
            if(!req.body.data.expense){
                throw new Error('Expense is mandatory!');
            }    
            const expense = req.body.data.expense; 
            const description = req.body.data.description; 
            const category = req.body.data.category; 
            
            const data = await Expense.findByPk(expenseId).then(data => {

                data.expense = expense,
                data.description = description,
                data.category = category
        
            });
        
            res.status(201).json(data);
        }catch(err){
            res.status(500).json({error: err})
        }
        
        
        
        }    


