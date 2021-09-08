const {Schema, model} = require ('mongoose')

const ProductoSchema = new Schema({
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

    categoria:{
        type:Schema.Types.ObjectId,
        ref:"Categoria",
        required:true
    },

    disponible:{
        type: Boolean,
        default:true
    },
    
    Cód_Producto:{
        type:Number
    },

    Cód_Barras:{
        type: Number
    },

    Unidad:{
        type:String
    },

    Alícuota_IVA:{
        type:String
    },

    Costo: {
        type: Number,
        default:0
    },

    Impuesto_Interno : {
        type: Number,
        default:0
    },

    Ganancia:{
        type: Number,
        default:0
    },

    Precio_Lista1:{
        type: Number,
        default:0
    },

    Precio_Lista2:{
        type: Number,
        default:0
    },

    Precio_Lista3:{
        type: Number,
        default:0
    },

    Pesable:{
        type:String
    },

    CantL2:{
        type: Number,
        default:0
    },

    CantL3:{
        type: Number,
        default:0
    },
})

ProductoSchema.methods.toJSON = function () {
    const {  __v, estado, ...data } = this.toObject();
    return data;
  };

module.exports=model("Producto",ProductoSchema)