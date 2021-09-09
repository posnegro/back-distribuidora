const { Router } = require("express");
const { check } = require("express-validator");


const { validarCampos } = require("../middlewares/validar-campos");
const {  validarJwt } = require("../middlewares/validar-jwt");
const { esAdminRol } = require("../middlewares/validar-rol");
const { existeCategoriaP } = require("../helpers/db-validators");

const {
    crearCategoriasP,
    obtenerCategoriasP,
    obtenerCategoriaP,
    actualizarCategoriaP,
    borrarCategoriaP,
} = require("../controllers/categoriaPadre");

  const router = Router();

router.get("/", obtenerCategoriasP);

router.get(
    "/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeCategoriaP),
      validarCampos,
    ],
    obtenerCategoriaP
);

router.post(
    "/",
    [
      validarJwt,
      esAdminRol,
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    crearCategoriasP
);

router.put(
    "/:id",
    [
      validarJwt,
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeCategoriaP),
      validarCampos,
    ],
    actualizarCategoriaP
);

router.delete(
    "/:id",
    [
      validarJwt,
      esAdminRol,
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeCategoriaP),
      validarCampos,
    ],
    borrarCategoriaP
  );
  
  module.exports = router;
  