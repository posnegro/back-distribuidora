const { Router } = require("express");
const { check } = require("express-validator"); 

const { existeCategoria} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const { esAdminRol } = require("../middlewares/validar-rol");

const {
  crearCategorias,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

router.get("/", obtenerCategorias);


router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoria
);


router.post(
  "/",
  [
    validarJwt,
    esAdminRol,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoriaP", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  crearCategorias,

);


router.put(
  "/:id",
  [
    validarJwt,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  actualizarCategoria
);


router.delete(
  "/:id",
  [
    validarJwt,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;