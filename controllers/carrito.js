const Producto = require("../models/producto");
const { response } = require("express");
const Carrito = require("../models/carrito");



const obtenerCarritos = async(req, res=reponse) =>{


    const CarritoListo = await Promise.all([
        Carrito.countDocuments({ estado: true }),
        Carrito.find({ estado: true })
          .sort("items")
          .populate("usuario", "nombre email")
          .populate("items", "nombre"),
      ]);

      res.json({
        CarritoListo,
      });
}

const obtenerCarrito = async(req, res=reponse) =>{
    const { id } = req.params;

    const CarritoListo = await Carrito.findById(id)
    .sort("items")
    .populate("usuario", "nombre email")
    .populate("items", "nombre")
      
    
      res.json({
        CarritoListo,
      });
}

const crearCarrito = async (req, res = response) =>{

    const {usuario, items} = req.body
    
    const productoRP = await Producto.findById(Carrito.items)

    // productoRP.push()
    
        const data = {
            usuario: req.usuario._id,
            items
        }
    
    const carrito = new Carrito(data)
    
        await carrito.save()
    
        res.json({
        msg: "carrito creado",
        carrito,
        })
    
}
const borrarCarrito = async (req, res = response) => {
    const { id } = req.params;
  
    const producto = await Producto.findByIdAndDelete(id);
  
    res.json({
      msg: "Producto eliminado",
    });
  };



module.exports = {crearCarrito, borrarCarrito, obtenerCarritos, obtenerCarrito};


// const crearCarrito = async (req, res = response) => {

//     const {usuario, items} = req.body;
    
//     const productoRP = await Producto.findById(Carrito)
    
    
//         const data = {
//             usuario: req.usuario._id,
//             items
//         }
//         const carrito = new Carrito(data)
    
//         await carrito.save()
    
//         res.status(201).json(carrito)
//     }
    

// module.exports = {crearCarrito,};
