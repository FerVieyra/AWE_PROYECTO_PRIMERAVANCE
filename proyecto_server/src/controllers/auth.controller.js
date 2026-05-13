const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            msg: "Datos invalidos."
        });
    }
    
    try{
        const user = await Usuario.findOne({email: email});
        if(!user){
            return res.status(400).json({
                msg: "Datos invalidos."
            })
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).json({
                msg: "Datos invalidos."
            })
        }

        jwt.sign({
            nombre: user.nombre,
            apellidos: user.apellidos,
            email: user.email,
            rol: user.rol
        }, process.env.SECRET_KEY,{
            expiresIn: '4h'
        }, (error, token) => {
            if(error){
                console.log(error);
                res.status(500).json({
                    msg: "Error en el servidor."
                })
            }
            res.status(200).json({
                msg: "Login exitoso.",
                token
            });
        })

        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor."
        });
    }
}

const register = async(req = request, res = response) => {
    const {
        nombre,
        apellidos,
        direccion,
        email,
        password,
    } = req.body;

    if(!nombre || !apellidos || !direccion || !email || !password){
        return res.status(400).json({
            msg: "Datos invalidos."
        });
    }

    try{
        const user = await Usuario.findOne({email: email});
        if(user){
            return res.status(400).json({
                msg: "El email ya esta registrado."
            });
        }

        const hashedPw = await bcrypt.hash(password, 10);

        const newUser = new Usuario({
            nombre,
            apellidos,
            direccion,
            email,
            password: hashedPw,
            rol: "cliente"
        });

        await newUser.save();
        res.status(200).json({
            msg: "Registro exitoso."
        })

    }catch(error){
        return res.status(500).json({
            msg: "Error en el servidor.",
            error: error.message
        })
    }

}

module.exports = {
    register,
    login
}