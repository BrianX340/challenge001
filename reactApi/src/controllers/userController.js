const User = require('../models/User')
const Operation = require('../models/Operation')

module.exports = {
    createOperation: (req, res) => {
        var { concept, amount, type } = req.body
        const userId = req.user._id

        if(!concept || !amount || !type || isNaN(amount)){
            return res.json({status:'error'})
        } 
        if(type != 'deposit' && type != 'retirement'){
            return res.json({status:'error'})
        }


        createOperationInUser(userId, concept, amount, type)
            .then(user =>{
                if(!user){
                    return res.send({status:'error'})
                }
                return User.findOne({_id:userId})
                    .populate({
                        path: 'movements'
                    })
                        .then(user=>{

                            movementsFiltered = []

                            user.movements.map(operation =>{
                                filteredOperation = {
                                    _id: operation._id,
                                    concept: operation.concept,
                                    amount: operation.amount,
                                    type: operation.type,
                                    createdAt: operation.createdAt
                                }
                                movementsFiltered.push(filteredOperation)
                            })

                            var userFiltered = {
                                _id: user._id,
                                email: user.email,
                                movements: movementsFiltered,
                                role: user.role,
                                token: req.body.token
                            }
                            return res.send({status:'ok', user:JSON.stringify(userFiltered)})
                        })
            })
                .catch(err=>{
                    return res.send({status:'error'})
                })


    }
}

async function createOperationInUser(userId, concept, amount, type) {
    let newOperation = new Operation({concept, amount, type, owner: userId})
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