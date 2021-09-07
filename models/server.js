const express = require("express")
const cors = require("cors")

const {dbConnection} =require('../database/config')

class Server {

    constructor() {

    this.app = express();
    this.usuariosPath = "/api/usuarios";

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
        this.app.use(this.usuariosPath, require("../routes/usuarios"))
    }

    listen() {
        this.app.listen(process.env.PORT, ()=>{
            console.log("Servidor online en puerto", process.env.PORT);
        });
    }
}

module.exports = Server