const {Router} = require('express');
const{hacerPedido, getPedidosFromEmail, cancelarPedido, getAllPedidos, deletePedido} = require('../controllers/pedido.controller');
const {verifyJWT} = require('../middleware/verifyJWT');
const {verifyAdminRole} = require('../middleware/verifyAdminRole');

const router = Router();

router.post('/comprar', [verifyJWT], hacerPedido);

router.get('/getPedidosFromEmail', [verifyJWT], getPedidosFromEmail);

router.patch('/cancelar', [verifyJWT], cancelarPedido);

router.get('/get', [verifyJWT, verifyAdminRole], getAllPedidos);

router.delete('/delete', [verifyJWT, verifyAdminRole], deletePedido);

module.exports = router