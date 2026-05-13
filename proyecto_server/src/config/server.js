const express = require("express");
const { connectDB } = require("./database");
const cors = require("cors");
const path = require('path');   

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
         
        this.authPath = "/api/auth";
        this.reservePath = "/api/reservacion";
        this.productPath = "/api/producto";
        this.userPath = "/api/usuario";
        this.pedidoPath = "/api/pedido";

        this.middlewares();
        this.routes();

        connectDB();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/images', express.static(path.join(__dirname, '../../public/images')));

        // 1. Servir los archivos estáticos de la app de Angular ya compilada
        // Ajusta la ruta según tu estructura de carpetas
        this.app.use(express.static(path.join(__dirname, '../../../proyecto_app/dist/proyecto/browser')));

    
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth.router'));
        this.app.use(this.reservePath, require('../routes/reservacion.router'));
        this.app.use(this.productPath, require('../routes/producto.routes'));
        this.app.use(this.userPath, require('../routes/user.routes'));
        this.app.use(this.pedidoPath, require('../routes/pedido.routes'));

        this.app.get('*splat', (req, res) => {
            res.sendFile(path.join(__dirname, '../../../proyecto_app/dist/proyecto/browser/index.html'));
        });
    }   

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}

module.exports = Server;