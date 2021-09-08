const {Schema, model} = require('mongoose');

const CategoriaSchema = new Schema ({
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
    padreCat:{
        type:Schema.Types.ObjectId,
        ref:"Categoria2",
        required:true
    },
    categoriaPadre:{
        type: String,
        required:true
    }
});

CategoriaSchema.method.toJSON = function (){
    const {__v, estado,... data} =this.toObject()

    return data;
}

module.exports = model("Categoria", CategoriaSchema);