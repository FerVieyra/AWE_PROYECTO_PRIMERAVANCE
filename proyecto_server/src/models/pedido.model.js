const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    emailUser: String,
    total: Number,
    direccion: String,
    estado: {type: String, enum: ['pendiente', 'En envio', 'recibido', 'Cancelado'], default: 'pendiente'}
})

module.exports = mongoose.model("Pedido", pedidoSchema);