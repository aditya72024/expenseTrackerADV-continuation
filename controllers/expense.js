const Expense = require('../models/expenses');

exports.getIndex = async (req,res,next) => {
    try{
        const data = await Expense.findAll();
        res.status(201).json(data);
    }catch{
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
    
        const data = await Expense.create({
            expense : expense,
            description : description,
            category : category
        });
    
        res.status(201).json(data);
    }catch(err){
        res.status(500).json({error: err})
    }
}


exports.deleteExpense = async (req,res,next) => {

try{    
    
    const expenseId = req.params.expenseId;

    
    const data = await Expense.findByPk(expenseId).then(expense => {
         return expense.destroy();
    })

    res.status(201).json(data);
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


