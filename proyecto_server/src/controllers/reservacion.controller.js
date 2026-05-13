const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Reservacion = require("../models/reservacion.model");

const crearReservacion = async(req = request, res = response) => {
    
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg: "No se proporciono un token de autenticacion."
        });
    }
    const {email} = jwt.verify(token, process.env.SECRET_KEY);
    const {fecha, hora, personas} = req.body;

    if(!email || !fecha || !hora || !personas){
        return res.status(400).json({
            msg: "Datos invalidos."
        });
    }

    try{
        const reservacion = new Reservacion({
            email,
            fecha,
            hora,
            numeroPersonas: personas
        })
        await reservacion.save();
        return res.status(200).json({
            msg: "Reservacion creada exitosamente.",
            reservacion
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al crear la reservacion.",
            error
        });
    }
}

const getReserveFromEmail = async(req = request, res = response) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg: "No se proporciono un token de autenticacion."
        });
    }
    const {email} = jwt.verify(token, process.env.SECRET_KEY);

    if(!email){
        return res.status(400).json({
            msg: "Datos invalidos."
        });
    }

    reserve = await Reservacion.find({email: email});
    try{
        res.status(200).json(reserve);
    }catch(error){
        console.log("error:     ", error);
        res.status(400).json({
            msg: "Error",
            error
        });
    }
}

const cancelarReservacion = async(req = request, res = response) => {
    const {_id} = req.body;

    if(!_id)
    {
        res.status(401).json({
            msg: "Id no proporcionado."
        });
    }

    const reservacion = await Reservacion.findById(_id);

    if(!reservacion)
    {
        res.status(401).json({
            msg: "Reserva no encontrada."
        });
    }

    try{
        reservacion.estado = 'cancelada';
        await reservacion.save();

        return res.status(200).json({
            msg: "Reservacion cancelada exitosamente.",
            reservacion
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error al cancelar.",
            error
        });
    }
}

const getReserves = async(req = request, res = response) => {
    const { q } = req.query;

    try{
        const reserves = await Reservacion.find({email: RegExp(q)});
        res.status(200).json(reserves)
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor :c"
        });
    }
}

const deleteReserva = async(req = request, res = response) => {
    const {_id} = req.body;
    if(!_id){
        return res.status(400).json({
            msg: "No hay id."
        });
    }

    const reservacion = await Reservacion.findById(_id);
    try{
        await reservacion.deleteOne({_id: _id});

        return res.status(200).json({
            msg: "Reservacion eliminada"
        });
    }catch(error)
    {
        return res.status(500).json({
            msg: "Error al eliminar.",
            error
        });
    }
}

module.exports = {
    crearReservacion,
    getReserveFromEmail,
    cancelarReservacion,
    getReserves,
    deleteReserva
}