const {Router} = require('express');
const router = Router();
const multer =  require('multer');
const multerConfig = require('./config/multer');

const userService = require('./services/user.service')
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const UserController = require('./controllers/UserController');
const AdminController = require('./controllers/AdminController');
const FileController = require('./controllers/FileController');


const upload = multer(multerConfig);
// routes
router.post('/auth', authenticate);     // public route
router.post('/admin', AdminController.store);       // all authenticated users
router.delete('/admin/:id', AdminController.destroy);       // all authenticated users
router.post('/users', authorize(Role.Admin), UserController.store); // admin only
router.delete('/users/:id', authorize(Role.Admin), UserController.destroy); // admin only
router.get('/users', UserController.index);       // all authenticated users
router.post('/profile/:id', upload.single('avatar'), FileController.store);

function authenticate(req, res, next) {
    console.log(req.body)
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

module.exports = router;