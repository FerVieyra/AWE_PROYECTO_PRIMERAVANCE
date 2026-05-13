const mongoose = require("mongoose");

const reservacionSchema = new mongoose.Schema({
    email: String,
    fecha: String,
    hora: String,
    numeroPersonas: Number,
    estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }
})

module.exports = mongoose.model("Reservacion", reservacionSchema);