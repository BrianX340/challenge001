const User = require('../models/User')
const Operation = require('../models/Operation')

module.exports = {
    createOperation: (req, res) => {
        var { concept, amount, date, type } = req.body
        const userId = req.user._id

        if(!concept || !amount || !date || !type){
            res.json({status:'error'})
        }


        createOperationInUser(userId, concept, amount, date, type)
            .then(user =>{
                if(!user){
                    return res.send({status:'error'})
                }
                return User.findOne({_id:userId})
                    .then(user=>{
                        return res.send({status:'ok', user})
                    })
            })
                .catch(err=>{
                    return res.send({status:'error'})
                })


    }
}

async function createOperationInUser(userId, concept, amount, date, type) {
    let newOperation = new Operation({concept, amount, date, type, owner: userId})
    await newOperation.save()

    return User.findByIdAndUpdate({ _id: userId }, { $push: { movements: newOperation._id } })
        .then(user=>{
            return (0, user)
        })
            .catch(err=>{
                console.log(err)
                return 1
            })
}