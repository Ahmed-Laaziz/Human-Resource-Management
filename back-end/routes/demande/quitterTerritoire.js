var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/quitterTerritoireController");


// router.get('/admins', adminController.getAdmins);

router.post('/add-demande-quitter-territoire', demandeController.addDemandeQuitterTerritoire);


module.exports = router;