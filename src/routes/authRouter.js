const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const {handleValidationMiddleWare} = require('../middlewares/validationUtils');
const { check } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

router.post(
    '/login',
    [
        check('userName')
            .exists()
            .withMessage('Valid userName must be provided'),
        
        check('passwd')
            .exists()
            .withMessage('password must be provided')
    ],
    handleValidationMiddleWare, 
    async(req,res) => {
        const {userName,passwd} = req.body
        const user = await userController.getUserByEmail(userName);

        const match = await bcrypt.compare(passwd, user.passwd);
        const accessToken = jwt.sign(user.userId, TOKEN_SECRET)
        if(match){
            res.json({ accessToken: accessToken });
        } else {
            res.json({ message: "Invalid Credentials" },400);
        }
    }
)

module.exports = router;