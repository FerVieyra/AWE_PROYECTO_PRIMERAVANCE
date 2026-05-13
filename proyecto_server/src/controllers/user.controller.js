const { response, request } = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require('../models/usuario.model');

const getCurrentUser = async(req = request, res = response) => {
    const token = await req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg: "No se proporciono un token de autenticacion."
        });
    }

    const { email} = await jwt.verify(token, process.env.SECRET_KEY);

    const user = await Usuario.findOne({email: email});

    if(!user)
    {
        return res.status(400).json({
            msg: "No se encontró el usuario."
        });
    }

    try{
        res.status(200).json(user);
    }catch(error){
        console.log("This is the error: ", error);
        res.status(400).json({
            msg: "Error.",
            error
        })
    }
}

const updateCurrentUser = async (req = request, res = response) => {
    const tokenAnterior = req.header('Authorization');
    if (!tokenAnterior) 
        return res.status(401).json({ msg: "No hay token." });

    try {
        const { email: emailDelToken } = jwt.verify(tokenAnterior, process.env.SECRET_KEY);
        const { nombre, apellidos, direccion, email: nuevoEmail, password } = req.body;

        const hashPw = await bcrypt.hash(password, 10)
        const usuario = await Usuario.findOneAndUpdate({ email: emailDelToken });

        if (!usuario) 
            return res.status(404).json({ msg: "No se encontró usuario." });

        const newUserInfo = await Usuario.updateOne({email: usuario.email}, 
        { nombre: nombre, apellidos: apellidos, direccion: direccion, email: nuevoEmail, password: hashPw });

        jwt.sign({
            nombre: newUserInfo.nombre,
            apellidos: newUserInfo.apellidos,
            email: newUserInfo.email,
            rol: newUserInfo.rol
        }, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (error, nuevoToken) => {
            if (error) {
                return res.status(500).json({ msg: "Error al generar nuevo token." });
            }

            // Enviamos el nuevo token al front para que reemplace al viejo
            res.status(200).json({
                msg: "Información y token actualizados correctamente.",
                user: newUserInfo,
                token: nuevoToken
            });
        });

    } catch (error) {
        res.status(500).json({ msg: "Error interno.", error: error.message });
    }
}

const getAllUsers = async(req = request, res = response) => {
    const { q } = req.query;

    try{
        const users = await Usuario.find({nombre: RegExp(q)});
        res.status(200).json(users)
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor :c"
        });
    }
}

const changeRole = async(req = request, res = response) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json({
            msg: "No hay email."
        });
    }

    const usuario = await Usuario.findOne({email: email});

    try{
        if(usuario.rol === 'cliente'){
            usuario.rol = 'administrador';
        }else{
            usuario.rol = 'cliente';
        }

        await usuario.save();

        return res.status(200).json({
            msg: "Rol cambiado",
            usuario
        });
    }catch(error)
    {
        return res.status(500).json({
            msg: "Error al cambiar rol.",
            error
        });
    }
}

const deleteUser = async(req = request, res = response) => {
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            msg: "No hay email."
        });
    }

    const usuario = await Usuario.findOne({email: email});

    try{
        await usuario.deleteOne({email: email});

        return res.status(200).json({
            msg: "Usuario eliminado"
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
    getCurrentUser,
    updateCurrentUser,
    getAllUsers,
    changeRole,
    deleteUser
}