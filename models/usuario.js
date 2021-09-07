const {Schema, model} = require('mongoose')

const UsuarioSchema = new Schema({
    nombre: {
      type: String,
      require: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      require: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "La contraseña es obligatoria"],
    },
    img: {
      type: String,
    },
    rol: {
      type: String,
      require: true,
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
  
  module.exports = model("Usuario", UsuarioSchema);
  