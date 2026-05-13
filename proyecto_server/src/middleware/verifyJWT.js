const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");


const verifyJWT = async (req = request, res = response, next) => {

    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({
            msg: "Token invalido"
        })
    }
    
    try{
        const { email } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Usuario.findOne({ email: email });
        if(!user){
            return res.status(401).json({
                msg: "Token invalido"
            })
        }   
        req.activeUserRole = user.rol;
        
        next();

    }catch(error){
        return res.status(401).json({
            msg: "Token invalido"
        })
    }
}

module.exports = {
    verifyJWT
}