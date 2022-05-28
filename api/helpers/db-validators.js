const RolModel = require('../models/roles');
const UserModel = require('../models/user');

const validarRol = async(idRol = '') => {
   const operacion = await RolModel.findById(idRol);
   if(!operacion){
      throw new Error(`El rol ${idRol} no existe`)
   }
}

const validarUser = async(idUser = '') => {
   const operacion = await UserModel.findById(idUser);
   if(!operacion){
      throw new Error(`El usuario ${idUser} no existe`)
   }
}

module.exports = {
   validarRol,
   validarUser
}