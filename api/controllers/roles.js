const {request, response} = require('express');
const RolModel = require('../models/roles');

const addRol = async(req = request, res = response) => {

   const {rol} = req.body

   try {
      
      const verificarRol = await RolModel.findOne({rol});

      if(verificarRol){
         return res.status(400).json({
            ok: false,
            msg: `El rol ${rol} ya existe`
         })
      }

      const newRol = await RolModel.create({rol});

      res.status(201).json({
         ok: true,
         newRol
      })
      
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Hable con el administrador'
      })
    }
}

module.exports = {
   addRol
}