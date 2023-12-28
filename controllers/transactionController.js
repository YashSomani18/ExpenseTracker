import transactionModel from '../models/transactionModel.js';
import moment from 'moment';


export const getAllTransaction = async(req,res) =>{
    try {
        const {frequency , selecteDate , type}= req.body;
        const transactions = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date:{
                    $gt :moment().subtract(Number(frequency),'d').toDate()
                }
            } : {
                date:{
                    $gte: selecteDate[0],
                    $lte: selecteDate[1],
                } 
            })
            ,
            userid:req.body.userid,
            ...(type !== 'all' && {type}),
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


export const addTransaction = async(req,res)=>{
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send('Transaction Created');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
}


export const editTransaction = async(req,res)=>{
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},
            req.body.payload);
            res.status(200).send('Editing has been done!')
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


export const deleteTransaction = async(req,res)=>{
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send("Transaction Deleted Succesfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}