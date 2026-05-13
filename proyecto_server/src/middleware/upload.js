const multer = require('multer');
const path = require('path');

// Configuración de dónde y cómo se guardará el archivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Se guarda en la carpeta public/uploads del backend
    cb(null, './public/images'); 
  },
  filename: (req, file, cb) => {
    // Renombramos el archivo con un timestamp para evitar duplicados
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });
module.exports = upload;