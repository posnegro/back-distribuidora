const { Router } = require("express");
const { check } = require("express-validator");

const { existeProducto } = require("../helpers/db-validators");
const { usuarioIdExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

const {crearCarrito, borrarCarrito, obtenerCarritos, obtenerCarrito} = require("../controllers/carrito")

router.get("/",[validarJWT,
    validarCampos],obtenerCarritos)

router.get("/:id",[validarJWT,
    validarCampos],obtenerCarrito)

router.post("/",
    [validarJWT,
    validarCampos]
    ,crearCarrito
);

router.delete("/:id",[
    validarJWT,validarCampos,
],borrarCarrito);

module.exports = router;