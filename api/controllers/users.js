const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user");

const addUser = async (req = request, res = response) => {
  // extraemos el body
  const { email, password, name, img, idRol } = req.body;
  try {
    // verifico si el usuario ya existe
    const verificarUser = await UserModel.findOne({email});
    if(verificarUser){
      return res.status(400).json({
        ok: false,
        msg: `El usuario ${email} ya existe`
      })
    }

    //   creamos una instancia de user
    const newUser = new UserModel({ email, password, name, img, idRol });

    //   encriptamos el password
    newUser.password = bcryptjs.hashSync(password, 10);

    //   guardamos el usaurio ya con el pasword encriptaddo
    await newUser.save();

    res.status(201).json({
      ok: true,
      newUser,
    });
  } catch (error) {
     console.log(error);
     res.status(500).json({
        msg: 'Hable con el administrador'
     })
  }
};

const getUsers = async(req = request, res = response) => {
  try {
    const users = await UserModel.find().populate('idRol', 'rol')

    res.status(200).json({
      ok: true,
      users
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

const getUser = async(req = request, res = response) => {

  const {idUser} = req.params;

  try {
    const user = await UserModel.findById(idUser).populate('idRol', 'rol')

    res.status(200).json({
      ok: true,
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

const putUser = async(req = request, res = response) => {

  const {idUser} = req.params;
  const { _id, password, google, state, email, ...resto } = req.body;

  try {

    if(password){
      resto.password = bcryptjs.hashSync(password, 10);
    }

    const userUpdate = await UserModel.findByIdAndUpdate(idUser, resto, {new: true}).populate('idRol', 'rol')

    res.status(200).json({
      ok: true,
      userUpdate
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

const deleteUser = async(req = request, res = response) => {

  const {idUser} = req.params;

  try {

    const userDeleted = await UserModel.findByIdAndUpdate(idUser, {state: false}, {new: true});

    res.status(200).json({
      ok: true,
      userDeleted
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  putUser,
  deleteUser
};
