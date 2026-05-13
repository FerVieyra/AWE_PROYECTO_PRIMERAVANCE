const mongoose = require('mongoose');

const connectDB = () => {
    const string = process.env.MONGO_STRING;
    const dbName = process.env.DB_NAME;

    mongoose.connect(string, {
        dbName: dbName 
    }).then(() => {
        console.log("Conexión a la base de datos establecida");
    }).catch((error) => {
        console.error("Error al conectar a la base de datos:");
        console.error(error);
    });
}

module.exports = {
    connectDB
}