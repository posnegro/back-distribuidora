const { Router } = require("express");
const { check } = require("express-validator"); 

const { existeCategoria2 } = require("../helpers/db-validators")
const { existeCategoria } = require("../helpers/db-validators")
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const { esAdminRol } = require("../middlewares/validar-rol");


const {
  crear2Categorias,
  obtener2Categorias,
  obtener2Categoria,
  actualizar2Categoria,
  borrar2Categoria,
} = require("../controllers/categorias2");

const router = Router();

router.get("/", obtener2Categorias);


router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoria2),
    validarCampos,
  ],
  obtener2Categoria
);


router.post(
  "/",
  [
    validarJwt,
    esAdminRol,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crear2Categorias,

);



router.put(
  "/:id",
  [
    validarJwt,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoria2),
    validarCampos,
  ],
  actualizar2Categoria
);


router.delete(
  "/:id",
  [
    validarJwt,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoria2),
    validarCampos,
  ],
  borrar2Categoria
);

module.exports = router;