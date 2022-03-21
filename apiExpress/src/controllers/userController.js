const User = require('../models/User')
const Operation = require('../models/Operation')
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    createOperation: async (req, res) => {
        var { concept, amount, date, type, token } = req.body
        const userId = req.user._id

        if (!concept || !amount || !date || !type || isNaN(amount)) {
            return res.json({ status: 'error' })
        }
        if (type != 'deposit' && type != 'retirement') {
            return res.json({ status: 'error' })
        }

        try {
            const user = await createOperationInUser(userId, concept, amount, date, type)
            if (user) {
                const userPopulated = await makePoPulateUserData(userId, token)
                return res.send({ status: 'ok', user:userPopulated })
            }
            return res.send({ status: 'error' })
        }
        catch (err){
            console.error(err)
            return res.send({ status: 'error' })
        }
    },
    deleteOperation: async (req, res) => {
        const { operationId, token } = req.body
        const userId = req.user._id

        const foundUser = await User.findById(userId);
        foundUser.movements.pull(new ObjectId(operationId.toString()));

        await foundUser.save();

        const userPopulated = await makePoPulateUserData(userId, token)
        return res.send({ status: 'ok', user:userPopulated })

    },
    updateOperation: async (req,res) => {
        const { operationId, modifyConcept, modifyAmount, modifyDate, token } = req.body
        const userId = req.user._id
        const userUpdated = await Operation.findOneAndUpdate({ _id: operationId }, { $set: { concept: modifyConcept, amount: modifyAmount, date: modifyDate } }, { upsert: true })
        if (!userUpdated) {
            return res.send({ 'status': 'error', 'msg': 'unexpected' })
        }
        const userPopulated = await makePoPulateUserData(userId, token)
        return res.send({ status: 'ok', user:userPopulated })
    }
}

async function createOperationInUser(userId, concept, amount, date, type) {
    let newOperation = new Operation({ concept, amount, date, type, owner: userId })
    await newOperation.save()
    const userUpdated = await User.findByIdAndUpdate({ _id: userId }, { $push: { movements: newOperation._id } })
    return userUpdated
}

async function makePoPulateUserData(userId,token){
    const user = await User.findOne({ _id: userId })
                    .populate({
                        path: 'movements'
                    })
    if(!user){
        return
    }
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

    return JSON.stringify(userFiltered)
}