const {Schema, model} = require('mongoose')

const UsuarioSchema = new Schema({
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    img: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
      enum: ["USER_ROL", "ADMIN_ROL"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      dafault: false,
    },
  });

  UsuarioSchema.methods.toJSON = function () {
    const { password, __v, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
  };
  
  module.exports = model("Usuario", UsuarioSchema);
  