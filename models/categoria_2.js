const {Schema, model} = require('mongoose');

const CategoriaSchema2 = new Schema ({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    estado:{
        type : Boolean,
        default : true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },
});

CategoriaSchema2.method.toJSON = function (){
    const {__v, estado,... data} =this.toObject()

    return data;
}

module.exports = model("Categoria2", CategoriaSchema2);