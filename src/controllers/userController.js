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

async function updateUserById(userId, userData){
    const { firstName, lastName } = userData; 
    const user = await User.findByPk(userId);
    if (!user) {
        return null; 
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;   

    await user.save(); 
    return user; 
}

async function updateUserPasswordById(userId, password){
    const user = await User.findByPk(userId);
    if (!user) {
        return null; 
    }

    user.passwd = password   

    await user.save(); 
    return user; 
} 

module.exports = {
    createUser,
    getUserById,
    deleteUserById,
    getUserByEmail,
    updateUserById,
    updateUserPasswordById
}