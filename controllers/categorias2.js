const { response } = require("express");
const Categoria2 = require("../models/categoria_2");

const obtener2Categorias = async (req, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 5; 
  }
  if (isNaN(desde)) {
    desde = 0;
  }

  const [total, categorias] = await Promise.all([
    Categoria2.countDocuments({ estado: true }),
    Categoria2.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre email"),
  ]);

  res.json({
    Total: total,
    categorias,
  });
};

//Obtener categoria - populate {}
const obtener2Categoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria2.findById(id).populate(
    "usuario",
    "nombre email"
  );

  res.json({
    categoria,
  });
};

//Crear categoria----------------------------------------
const crear2Categorias = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria2.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre} ya existe`,
    });
  }
  

  //Generar la data
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria2(data);

  //Guardar DB
  await categoria.save();
  res.status(201).json(categoria);
};

//Actualizar categoria--------------------------------
const actualizar2Categoria = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  
  resto.nombre = resto.nombre.toUpperCase();

  const categoria = await Categoria2.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    msg: "Categoría actualizada",
    categoria,
  });
};

//Borrar Categoria------------------------------------
const borrar2Categoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria2.findByIdAndUpdate(
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
  crear2Categorias,
  obtener2Categorias,
  obtener2Categoria,
  actualizar2Categoria,
  borrar2Categoria,
};