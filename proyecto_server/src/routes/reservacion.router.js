const { Router } = require('express');
const { crearReservacion, getReserveFromEmail, cancelarReservacion, getReserves, deleteReserva } = require('../controllers/reservacion.controller');
const {verifyJWT} = require('../middleware/verifyJWT');
const {verifyAdminRole} = require('../middleware/verifyAdminRole');

const router = Router();

router.post('/crear', [verifyJWT], crearReservacion);

router.get('/getReservesFromEmail', [verifyJWT], getReserveFromEmail);

router.patch('/cancelar', [verifyJWT], cancelarReservacion);

router.get('/get', [verifyJWT, verifyAdminRole], getReserves);

router.delete('/delete', [verifyJWT, verifyAdminRole], deleteReserva);

module.exports = router;