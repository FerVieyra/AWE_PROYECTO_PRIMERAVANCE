const { request, response } = require('express');
const jwt = require("jsonwebtoken");
const Pedido = require('../models/pedido.model');

const hacerPedido = async(req = request, res = response) =>
{
    const token = req.header('Authorization');
    
    if(!token){
        return res.status(401).json({
            msg: "No se proporciono un token de autenticacion."
        });
    }
    const {email} = jwt.verify(token, process.env.SECRET_KEY);
    
    const {total, direccion} = req.body;

    if(!email || !total || !direccion)
    {
        return res.status(400).json({
            msg: "Datos invalidos."
        });
    }

    try
    {
        const pedido = new Pedido({
            emailUser: email,
            total,
            direccion
        });

        await pedido.save();
        return res.status(200).json({
            msg: "Pedido realizado exitosamente.",
            pedido
        });
    }
    catch(error){
        return res.status(500).json({
            msg: "Error al hacer pedido",
            error
        })
    }
}

const getPedidosFromEmail = async(req = request, res = response) => {
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
    pedidos = await Pedido.find({emailUser: email});
    try{
        res.status(200).json(pedidos);
    }catch(error){
        console.log("error: ", error);
        res.status(400).json({
            msg: "Error",
            error
        });
    }
}

const cancelarPedido = async(req = request, res = response) => {
    const {_id} = req.body;

    if(!_id)
    {
        res.status(401).json({
            msg: "Id no proporcionado."
        });
    }

    const pedido = await Pedido.findById(_id);

    if(!pedido)
    {
        res.status(401).json({
            msg: "Pedido no encontrado."
        });
    }

    try{
        pedido.estado = 'Cancelado';
        await pedido.save();

        return res.status(200).json({
            msg: "pedido cancelado exitosamente.",
            pedido
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error al cancelar.",
            error
        });
    }
}

const getAllPedidos = async(req = request, res = response) => {
    const { q } = req.query;

    try{
        const pedidos = await Pedido.find({emailUser: RegExp(q)});
        res.status(200).json(pedidos)
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor :c"
        });
    }
}

const deletePedido = async(req = request, res = response) => {
    const {_id} = req.body;
    if(!_id){
        return res.status(400).json({
            msg: "No hay id."
        });
    }

    const pedido = await Pedido.findById(_id);
    try{
        await Pedido.deleteOne({_id: _id});

        return res.status(200).json({
            msg: "Pedido eliminado"
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
    hacerPedido,
    getPedidosFromEmail,
    cancelarPedido,
    getAllPedidos,
    deletePedido
}