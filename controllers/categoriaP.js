const { response } = require("express");
const CategoriaP = require("../models/categoriaP");

const obtenerCategoriasP = async (req, res = response) => {
    let { limite = 3, desde = 0 } = req.query;
  
    limite = Number(limite);
    desde = Number(desde);
  
    if (isNaN(limite)) {
      limite = 3;
    }
    if (isNaN(desde)) {
      desde = 0;
    }
    const [total, categorias] = await Promise.all([
        CategoriaP.countDocuments({ estado: true }),
        CategoriaP.find({ estado: true })
          .skip(desde)
          .limit(limite)
          .populate("usuario", "nombre email"),
      ]);
    
      res.json({
        Total: total,
        categorias,
      });
    };


const obtenerCategoriaP = async (req, res = response) => {
    const { id } = req.params;
      
    const categoria = await CategoriaP.findById(id).populate(
      "usuario",
      "nombre email"
    );
      
    res.json({
      categoria,
    });
};

const crearCategoriasP = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
  
    const categoriaDB = await CategoriaP.findOne({ nombre });
  
    if (categoriaDB) {
      return res.status(400).json({
        msg: `La categoría ${categoriaDB.nombre} ya existe`,
      });
    }
   
    const data = {
      nombre,
      usuario: req.usuario._id,
    };
  
    const categoria = new CategoriaP(data);
  
    
    await categoria.save();
    res.status(201).json(categoria);
};

const actualizarCategoriaP = async (req, res = response) => {
    const { id } = req.params;
  
    const { _id, ...resto } = req.body;

    const categoriaDB = await CategoriaP.findOne({ nombre :resto.nombre.toUpperCase() });
  
    if (categoriaDB) {
      return res.status(400).json({
        msg: `La categoría ${categoriaDB.nombre} ya existe`,
      });
    }
    else{
    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;}
  

    const categoria = await CategoriaP.findByIdAndUpdate(id, resto, {
      new: true,
    });
  
    res.json({
      msg: "Categoría actualizada",
      categoria,
    });
};

const borrarCategoriaP = async (req, res = response) => {
    const { id } = req.params;
  
    const categoria = await CategoriaP.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
  
    res.json({
      msg: "Categoría eliminada",
      categoria,
    });
};
module.exports = {
  crearCategoriasP,
  obtenerCategoriasP,
  obtenerCategoriaP,
  actualizarCategoriaP,
  borrarCategoriaP,
};
  
  
