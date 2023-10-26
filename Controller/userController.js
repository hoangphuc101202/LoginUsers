const userModel = require('../Models/userModel');

module.exports = {
    updateUsers : async (req,res,next) => {
        const {fullname, birthday} = req.body;
        const user = req.payload
        const updateUser = await userModel.updateOne({
            email : user.email
        },
        {
            fullname: fullname,
            birthday : birthday
        });
       if(updateUser.modifiedCount === 1) {
        res.json('Updated Successfully');
       }
    }
}