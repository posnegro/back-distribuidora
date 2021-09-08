const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones
const { existeProducto } = require("../helpers/db-validators");
const { existeCategoria } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const { esAdminRol } = require("../middlewares/validar-rol");

const {
    crearProductos,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
} = require ("../controllers/prductos");

const router = Router();

router.get("/", obtenerProductos);

router.get(
    "/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeProducto),
      validarCampos,
    ],
    obtenerProducto
  );

router.post(
    "/",
    [
      validarJwt,
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("categoria", "No es un ID válido").isMongoId(),
      check("categoria").custom(existeCategoria),
      check("categoriaPadre", "categoria obligatoria").not().isEmpty(),
      validarCampos,
    ],
    crearProductos,
  );

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
