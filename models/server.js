const express = require("express")
const cors = require("cors")

const {dbConnection} =require('../database/config')

class Server {

    constructor() {

    this.app = express();
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth"
    this.categoriasPath ='/api/categorias'
    this.productosPath = "/api/productos"
    this.categorias2Path = "/api/categorias2"

    this.conectarDB();

    this.middlewares();

    this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        
        this.app.use(express.static("public"));

        this.app.use(cors())

        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }
    routes() {
        this.app.use(this.authPath,require("../routes/auth"))
        this.app.use(this.usuariosPath, require("../routes/usuarios"))
        this.app.use(this.categoriasPath, require("../routes/categorias"))
        this.app.use(this.productosPath, require("../routes/productos"))
        this.app.use(this.categorias2Path, require ("../routes/categorias2"))

    }

    listen() {
        this.app.listen(process.env.PORT, ()=>{
            console.log("Servidor online en puerto", process.env.PORT);
        });
    }
}

module.exports = Server