const {Router} = require('express');
const {agregarProducto, getProductos, deleteProducto, getProdById, updateProd} = require('../controllers/producto.controller');
const upload = require('../middleware/upload');
const {verifyJWT} = require('../middleware/verifyJWT');
const {verifyAdminRole} = require('../middleware/verifyAdminRole');

const router = Router();

router.post('/agregar', [verifyJWT, verifyAdminRole], upload.single('imagen'), agregarProducto);
router.get('/get', getProductos);
router.delete('/delete', [verifyJWT, verifyAdminRole], deleteProducto);
router.get('/getById/:id', [verifyJWT, verifyAdminRole], getProdById); 
router.put('/update', [verifyJWT, verifyAdminRole], updateProd);

module.exports = router;