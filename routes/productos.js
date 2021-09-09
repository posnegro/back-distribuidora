const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones

const { existeProducto } = require("../helpers/db-validators");
const { existeCategoria } = require("../helpers/db-validators");

//middlewares
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const { esAdminRol } = require("../middlewares/validar-rol");

const {
  obtenerProductos,
  obtenerProducto,
  crearProductos,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const router = Router();

//Obtener todos las producto - publico
router.get("/", obtenerProductos);

//Obtener los producto por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProducto
);

//crear producto privado
router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID válido").isMongoId(),
    check("cod_Producto", "Es necesario el codigo del Producto").not().isEmpty(),
    check("cod_Barras", "Es necesario el codigo del Barras").not().isEmpty(),
    validarCampos,
  ],
  crearProductos
);

//actualizar registro por id privado
router.put(
  "/:id",
  [
    validarJwt,

    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  actualizarProducto
);

//borrar categoria privado - admin
router.delete(
  "/:id",
  [
    validarJwt,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
