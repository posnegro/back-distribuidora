const { Schema, model } = require("mongoose");

const CarritoSchema = new Schema ({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
      },
    estado: {
       type: Boolean,
       default: true,
       required: true,
      },
    items:[
    {
       type: Schema.Types.ObjectId,
       ref: "Producto",
    },
],
});

module.exports = model("Carrito", CarritoSchema)