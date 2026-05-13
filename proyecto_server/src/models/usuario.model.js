const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 12 },
    rol: { type: String, enum: ['administrador', 'cliente'], default: 'cliente' },
});

module.exports = mongoose.model('Usuario', usuarioSchema);