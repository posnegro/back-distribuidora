
const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJwt = async(req=request, res = response, next) => {

    const token = req.header("x-token")

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }
    try {
    
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //LEER USUARIO
        const usuario = await Usuario.findById(uid)

        //SI EL USUARIO EXISTE

        if(!usuario){
            return res.status(401).json({
                msg:"Token no es valido - usuario no existe"
            })
        }

        //VERIFICAR SI EL UID ES DE UN USUARIO ACTIVO
        if(!usuario.estado){
            return res.status(401).json({
                msg:"Token no valido - usuario inactivo"
            })
        }
        
        req.usuario= usuario;

        next()
    } catch (error) {
        res.status(401).json({
            msg: "Token no valido",
        })
        
    }
};

module.exports = {
    validarJwt,
}