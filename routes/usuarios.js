const {Router} = require('express');
const {check} = require('express-validator')

const router = Router();

const {validarCampos} = require ("../middlewares/validar-campos")
const {emailExiste, idExiste} = require ("../helpers/db-validators")

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
} = require('../controllers/usuarios');


 router.get('/', usuariosGet);

 router.post('/',[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "Debe tener una contraseña").not().isEmpty().trim(),
    check("password", "La contraseña debe tener 5 caracteres como minimo").isLength({
        min:6,
    }),
    check("email", "No es un correo valido").isEmail(),
    check("email").custom(emailExiste),
    check("rol","El rol no es valido").isIn(["USER_ROL", "ADMIN_ROL"]),
    validarCampos,
    ] , usuariosPost);

 router.put('/:id',[
 check("id", "No es un id valido").isMongoId(),
 check("id").custom(idExiste),
 validarCampos,
] ,usuariosPut);
 
 router.delete('/:id', usuariosDelete);

 module.exports = router;