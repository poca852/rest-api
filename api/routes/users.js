const { Router } = require('express');
const { addUser } = require('../controllers/users');

const router = Router();

router.post('/', addUser)

module.exports = router;