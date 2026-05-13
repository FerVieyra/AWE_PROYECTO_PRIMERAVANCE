const { response, request } = require("express");

const verifyAdminRole = async (req = request, res = response, next) => {
    

    if(!req.activeUserRole){
        return res.status(401).json({
            msg: "Permiso denegado"
        })
    }

    if(req.activeUserRole !== "administrador"){
        return res.status(401).json({
            msg: "Permiso denegado"
        })
    }

    next();
}

module.exports = {
    verifyAdminRole
}