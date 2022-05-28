const { Schema, model } = require('mongoose');

const UserModel = Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },

   name: {
      type: String,
      required: true
   },

   password: {
      type: String,
      required: true
   },

   google: {
      type: Boolean,
      default: false
   },

   state: {
      type: Boolean,
      default: true
   },

   img: {
      type: String
   },

   idRol: {
      type: Schema.Types.ObjectId,
      ref: "Rol"
   }
})

UserModel.methods.toJSON = function(){
   const { __v, _id, password, ...user } = this.toObject();
   user.id = _id;
   return user;
};

module.exports = model('User', UserModel);