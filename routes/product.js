const express = require('express')

const router = express.Router()

const {read, list, create, update, remove} = require('../controllers/product.js')
const {auth} = require('../middleware/auth')
router.get('/product/:id',auth,read)
router.get('/list',auth, list)
router.post('/product',auth,create)
router.put('/product/:id'.auth,update)
router.delete('/product/:id',auth,remove)


module.exports = router