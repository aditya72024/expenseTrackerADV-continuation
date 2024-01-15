const Expense = require('../models/expenses');
const User = require('../models/user');
const sequelize = require('../util/database');
exports.getIndex = async (req,res,next) => {
    try{
        
        const data = await req.user.getExpenses();

        res.status(201).json(data);
    }catch(err){
        res.status(500).json({error: err})
    }
}

exports.addExpense = async (req,res,next) => {
    console.log(req.body.data);
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
        });

        User.update({totalExpense: +(req.user.totalExpense)+ +(expense)}, {where:{id: req.user.id}});
    
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({error: err})
    }
}


exports.deleteExpense = async (req,res,next) => {

try{    
    
    const expenseId = req.params.expenseId;

    
    const expense = await req.user.getExpenses({where: {id: expenseId }});

    const data = expense[0].destroy();

    res.status(201).json(data);
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


        // const data = await User.findAll({
        //     attributes: ['username', [sequelize.fn('sum', sequelize.col('expenses.expense')), 'Total Expense']],
        //     include : [{
        //         model: Expense, attributes: []
        //     }],
        //     group : ['users.id'],
        //     order : [['Total Expense', 'DESC']],
        // });


          res.status(201).json(data)

    }catch(err){
        res.status(500).json({error: err})
    }
}


exports.getParticularExpense = async (req,res,next) => {

    try{    
        
        const expenseId = req.params.expenseId;
    
        
        const data = await Expense.findByPk(expenseId);
    
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({error: err})
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


