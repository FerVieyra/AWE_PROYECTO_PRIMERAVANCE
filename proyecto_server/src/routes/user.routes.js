const {Router} = require('express');
const {getCurrentUser, updateCurrentUser, getAllUsers, changeRole, deleteUser} = require('../controllers/user.controller');
const {verifyJWT} = require('../middleware/verifyJWT');
const {verifyAdminRole} = require('../middleware/verifyAdminRole');

const router = Router();

router.get('/get', [verifyJWT], getCurrentUser);
router.put('/update', [verifyJWT], updateCurrentUser);
router.get('/getAll', [verifyJWT, verifyAdminRole], getAllUsers);
router.patch('/cambiarRol', [verifyJWT, verifyAdminRole], changeRole);
router.delete('/delete', [verifyJWT, verifyAdminRole], deleteUser);

module.exports = router