const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

router.post('/postuser', userController.addUser);

router.get('/getuser', userController.getUser);

router.delete('/deleteuser/:userid', userController.deleteUser);

module.exports = router;