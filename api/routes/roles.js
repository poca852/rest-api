const { Router } = require('express');
const { check } = require('express-validator');
const { addRol } = require('../controllers/roles');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
   check('rol', 'El rol es obligatorio').not().isEmpty(),
   validarCampos
], addRol)

module.exports = router;