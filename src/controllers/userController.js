const User = require('../models/user');

async function createUser(userData){
    const {firstName, lastName, passwd, emailAddress} = userData;
    const user = await User.create({
        firstName,
        lastName,
        passwd,
        emailAddress
    })

    return user
}

async function getUserById(userId){
    return await User.findByPk(
        userId
    )
}

async function getUserByEmail(userEmail){
    return await User.findOne({ where: { emailAddress: userEmail }}) 
}


async function deleteUserById(userId){
    await User.destroy({ where: { userId: userId }});
}


module.exports = {
    createUser,
    getUserById,
    deleteUserById,
    getUserByEmail
}