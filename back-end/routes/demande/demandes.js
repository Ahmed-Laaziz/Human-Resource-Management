var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/demandesController");


// router.get('/admins', adminController.getAdmins);

router.get('/profDemandes/:professeurId', demandeController.getDemandesForProfesseur);

module.exports = router;