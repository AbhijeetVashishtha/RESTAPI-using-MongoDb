const users = require('../models/users');

exports.addUser = async (req,res) =>{
    try{
        const { name, email} = req.body;
        const data = await new users({name, email});

        data.save();
        res.status(200).json({data: data, success: true});
    }
    catch(err){
        console.log(err);
        req.status(500).json({error: err, success: false});
    }
}

exports.getUser = async (req,res) => {
    try{
        let data = await users.find();
        res.status(200).json({data: data, success: true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err, success: false});
    }
};

exports.deleteUser = async (req,res) => {
    const userId = req.params.userid;
    // console.log(userId);
    try{
        const numberOfUser = await users.deleteOne({_id: userId});
        if(numberOfUser == 0)
        {
            return res.status(400).json({success: false, message: "No user Found"});
        }
        else
        {
            res.status(200).json({success: true, message: 'User Successfully deleted'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err, success: false});
    }
}