const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const router = express.Router();
const {handleValidationMiddleWare} = require('../middlewares/validationUtils');
const bcrypt = require('bcrypt');

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

        var {firstName,lastName,emailAddress,passwd} = req.body;
        passwd = await bcrypt.hash(passwd,saltRoundsForPassword);

        await userController.createUser({firstName,lastName,emailAddress,passwd})
        res.sendStatus(200);
    }
)


module.exports = router;