const { Schema, model } = require('mongoose');

const RolModel = Schema({
   rol: {
      type: String,
      required: true,
      unique: true
   }
})

RolModel.methods.toJSON = function(){
   const { __v, _id, ...resto } = this.toObject();
   resto.id = _id;
   return resto;
};

module.exports = model('Rol', RolModel);