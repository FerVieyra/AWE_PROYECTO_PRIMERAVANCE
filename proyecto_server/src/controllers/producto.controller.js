const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Producto = require('../models/producto.model');

const agregarProducto = async(req = request, res = response) => {
    const {nombre, descripcion, precio} = req.body;
    const imagen = req.file;


    if(!nombre || !descripcion || !imagen || !precio)
    {
        return res.status(400).json({
            msg: "Datos invalidos hermano.",
            nombre,
            descripcion,
            imagen,
            precio
        });
    }

    try{
        const newProd = new Producto({
            nombre,
            descripcion,
            precio,
            imagen: `/images/${req.file.filename}`
        })

        await newProd.save();
        return res.status(200).json({
            msg: "Producto guardado correctamente.",
            newProd
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error en la creación.",
            error
        });
    }
}

const getProductos = async(req = request, res = response) => {
    const { q } = req.query;

    try{
        const prods = await Producto.find({nombre: RegExp(q)});
        res.status(200).json(prods)
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor :c"
        });
    }
}

const deleteProducto = async(req = request, res = response) => {
    const {_id} = req.body;
    if(!_id){
        return res.status(400).json({
            msg: "No hay id."
        });
    }

    const prod = await Producto.findById(_id);
    try{
        await prod.deleteOne({_id: _id});

        return res.status(200).json({
            msg: "Producto eliminado"
        });
    }catch(error)
    {
        return res.status(500).json({
            msg: "Error al eliminar.",
            error
        });
    }
}

const getProdById = async(req = request, res = response) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({
            msg: "Datos invalidos."
        });
    }
    prod = await Producto.findOne({_id: id});
    try{
        res.status(200).json(prod);
    }catch(error){
        console.log("error: ", error);
        res.status(400).json({
            msg: "Error",
            error
        });
    }
}

const updateProd = async(req = request, res = response) => {
    const {id,nombre,descripcion,precio,imagen} = req.body;

    if(!id || !nombre || !descripcion || !precio || !imagen)
    {
        return res.status(400).json({
            msg: "Datos invalidos."
        });
    }

    prod = await Producto.findOne({_id: id});

    if(!prod)
    {
        return res.status(400).json({
            msg: "producto no encontrado"
        });
    }

    if(nombre !== prod.nombre)
        prod.nombre = nombre;
    if(descripcion !== prod.descripcion)
        prod.descripcion = descripcion;
    if(precio !== prod.precio)
        prod.precio = precio;
    if(imagen !== prod.imagen)
        prod.imagen = imagen;

    try{
        await prod.save();
        return res.status(200).json({
            msg: "Producto guardado correctamente.",
            prod
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error en la actualizacion.",
            error
        });
    }
}

module.exports = {
    agregarProducto,
    getProductos,
    deleteProducto,
    getProdById,
    updateProd
}