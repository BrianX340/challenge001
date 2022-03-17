const User = require('../models/User')
const Operation = require('../models/Operation')
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    createOperation: (req, res) => {
        var { concept, amount, date, type, token } = req.body
        const userId = req.user._id

        if (!concept || !amount || !date || !type || isNaN(amount)) {
            return res.json({ status: 'error' })
        }
        if (type != 'deposit' && type != 'retirement') {
            return res.json({ status: 'error' })
        }


        createOperationInUser(userId, concept, amount, date, type)
            .then(user => {
                console.log(user)
                if (user) {
                    console.log('s')
                    return makePoPulateUserData(userId, token)
                        .then(user=>{
                            console.log('asd')
                            return res.send({ status: 'ok', user })
                        })
                }
                return res.send({ status: 'error' })
                                    
            })
            .catch(err => {
                return res.send({ status: 'error' })
            })


    },
    deleteOperation: async (req, res) => {
        const { operationId, token } = req.body
        const userId = req.user._id

        const foundUser = await User.findById(userId);
        foundUser.movements.pull(new ObjectId(operationId.toString()));

        await foundUser.save();

        return makePoPulateUserData(userId, token, (user)=>{
            console.log('wwwwwwwwwwwwwwwwwwww')
            return res.json({status:'ok', user});
        })
    }
}

async function createOperationInUser(userId, concept, amount, date, type) {
    let newOperation = new Operation({ concept, amount, date, type, owner: userId })
    await newOperation.save()

    return User.findByIdAndUpdate({ _id: userId }, { $push: { movements: newOperation._id } })
        .then(user => {
            return (0, user)
        })
        .catch(err => {
            console.log(err)
            return 1
        })
}

async function makePoPulateUserData(userId,token,callback){
    console.log('11111111111111111')
    return User.findOne({ _id: userId })
                    .populate({
                        path: 'movements'
                    })
                    .then(user => {
                        console.log('122222222222221111111111111111')

                        movementsFiltered = []

                        user.movements.map(operation => {
                            filteredOperation = {
                                _id: operation._id,
                                concept: operation.concept,
                                amount: operation.amount,
                                type: operation.type,
                                date: JSON.stringify(operation.date).slice(1,11),
                                createdAt: operation.createdAt
                            }
                            movementsFiltered.push(filteredOperation)
                        })

                        var userFiltered = {
                            _id: user._id,
                            email: user.email,
                            movements: movementsFiltered,
                            role: user.role,
                            token
                        }
                        console.log('55666666666666666')

                        callback(JSON.stringify(userFiltered))
                    })
                    .catch(err=>{
                        console.log(err,'eroorororor')
                    })
}