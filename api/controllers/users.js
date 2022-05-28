const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user");

const addUser = async (req = request, res = response) => {
  try {
    // extraemos el body
    const { email, password, name, img } = req.body;

    //   creamos una instancia de user
    const newUser = new UserModel({ email, password, name, img });

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

module.exports = {
  addUser,
};
