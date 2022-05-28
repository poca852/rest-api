const { Router } = require('express');
const { check } = require('express-validator');
const { addUser, getUsers, getUser, putUser, deleteUser } = require('../controllers/users');
const { validarRol, validarUser } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
   check('email', 'No es un email valido').isEmail(),
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('password', 'El password debe ser de minimo 6 caracteres').isLength({min: 5}),
   check('idRol').custom(validarRol),
   validarCampos
], addUser)

router.get('/', getUsers)

router.get('/:idUser', [
   check('idUser', 'No es un id valido').isMongoId(),
   check('idUser').custom(validarUser),
   validarCampos
], getUser)

router.put('/:idUser', [
   check('idUser', 'No es un id valido').isMongoId(),
   check('idUser').custom(validarUser),
   validarCampos
], putUser)

router.delete('/:idUser', [
   check('idUser', 'No es un id valido').isMongoId(),
   check('idUser').custom(validarUser),
   validarCampos
], deleteUser)

module.exports = router;