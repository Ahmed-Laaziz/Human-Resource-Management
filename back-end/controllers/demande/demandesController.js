const Demande = require("../../models/demande");
const mongoose = require('mongoose');


// mongoose.connect("mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017
const DB_HOST = 'mongo'
//Docker
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
//Local
const URI = "mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI).then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));
// mongoose.connect('mongodb://127.0.0.1:27017/ensaj', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


exports.getDemands = async (req, res, next) => {
  try {
    const allDemands = await Demande.find({});
    res.status(200).json(allDemands);
  } catch (error) {
    console.error('Error retrieving demand:', error);
    res.status(500).json({ error: 'Failed to retrieve demand' });
  }
};

// Define a route to get agent data by ID
exports.getDemandesForProfesseur = async (req, res) => {
    try {
      const professeurId = req.params.professeurId;
  
      // Use Mongoose to find all demandes with the matching professeur ID
      const demandes = await Demande.find({ professeur: professeurId });
  
      res.json(demandes);
    } catch (error) {
      console.error('Error fetching demandes:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.updateStatut = async (req, res) => {
    try {
      const demandId = req.params.demandId;
      const newStatut = req.body.statut; // You can send the new statut in the request body
  
      // Use Mongoose to find the demand by ID and update its statut field
      const updatedDemand = await Demande.findByIdAndUpdate(
        demandId,
        { statut: newStatut },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedDemand) {
        return res.status(404).json({ error: 'Demand not found' });
      }
  
      res.status(200).json(updatedDemand);
    } catch (error) {
      console.error('Error updating statut:', error);
      res.status(500).json({ error: 'Failed to update statut' });
    }
  };
  exports.getEnAttenteAndEnCoursDemands = async (req, res) => {
    try {
      // Use Mongoose to find demands with 'statut' equal to either "En attente" or "En cours"
      const enAttenteAndEnCoursDemands = await Demande.find({ statut: { $in: ['En attente', 'En Cours'] } });
      res.json(enAttenteAndEnCoursDemands);
    } catch (error) {
      console.error('Error fetching "En attente" and "En cours" demands:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };