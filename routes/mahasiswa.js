const router = require('express').Router()

// controller yang ingin dipakai
const mahasiswaController = require('../controllers/mahasiswaController')

// endpoint mahasiswa
router.get('/', mahasiswaController.viewMahasiswa)

module.exports = router