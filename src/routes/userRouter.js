const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const router = express.Router();
const {handleValidationMiddleWare} = require('../middlewares/validationUtils');
const bcrypt = require('bcrypt');
const {validateTokenMiddleware} = require('../middlewares/authUtils');


const saltRoundsForPassword = 10;

router.post(
    '/', 
    [
        check('firstName')
            .exists()
            .withMessage('Valid firstName must be provided'),
        check('lastName')
            .exists()
            .withMessage('Valid lastName must be provided'),
        check('emailAddress')
            .exists()
            .withMessage('Valid email must be provided')
            .isEmail()
            .withMessage('Valid email must be provided'),
        check('passwd')
            .exists()
            .withMessage('Valid password with length 6-30 must be provided')
            .isLength({ min: 6, max: 30 })
            .withMessage('Valid password with length 6-30 must be provided'),
    ],
    handleValidationMiddleWare,
    async (req,res)=>{
        
        try{
            var {firstName,lastName,emailAddress,passwd} = req.body;
            passwd = await bcrypt.hash(passwd,saltRoundsForPassword);

            await userController.createUser({firstName,lastName,emailAddress,passwd})
            res.sendStatus(200);
        } catch(error) {
            console.error(error);
            res.status(500).send('An error occurred while creating the user.');
        }

        
    }
)

router.patch(
    '/userinfo', 
    validateTokenMiddleware,
    async (req, res) => {
        const { userId, firstName, lastName } = req.body;

        try {
            const updatedUser = await userController.updateUserById(userId, { firstName, lastName });
            if (updatedUser) {
                res.sendStatus(200); 
            } else {
                res.sendStatus(404); 
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while updating the user.');
        }
    }
);

router.get(
    '/',
    validateTokenMiddleware,
    async (req, res) => {
        const { userId } = req.body;

        try {
            const user = await userController.getUserById(userId);
            
            const firstName = user.firstName;
            const lastName = user.lastName;
            const emailAddress = user.emailAddress;

            if (user) {
                res.json({firstName,lastName,emailAddress},200); 
            } else {
                res.sendStatus(404); 
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching the user.');
        }
    }
)



module.exports = router;