const { request, response,  } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require("bcryptjs"); 
const {validationResult} = require ("express-validator")

const usuariosGet = (req=request, res=response) => {
    res.json({
        msg :'get users'
       });
}

const usuariosPost = async (req=request, res=response) => {

    const {nombre, email, password, rol } = req.body;

    const usuario = new Usuario({ nombre, email, password, rol });

    const salt = bcrypt.genSaltSync()

    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save();

    res.json({
        msg:"Usuario creado",
        usuario,

       });
}

const usuariosPut = async(req=request, res=response) => {

    const id = req.params.id;
    const {_id, email, rol, password, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto, {new:true});
    res.json({
        msg :'put users',
        usuario,
       });
}

const usuariosDelete = async (req=request, res=response) => {
    const {id} = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
        msg :'delete users',
        usuario,
       });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}