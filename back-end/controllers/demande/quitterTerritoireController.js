const DemandeQuitterTerritoire = require("../../models/dem_quitter_territoire");
const mongoose = require('mongoose');


//mongoose.connect("mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));

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

// Add a route to retrieve and display a list of Professeurs
// exports.getAdmins = async (req, res, next) => {
//     try {
//       const allAdmins = await Admin.find({});
//       res.status(200).json(allAdmins);
//     } catch (error) {
//       console.error('Error retrieving admin:', error);
//       res.status(500).json({ error: 'Failed to retrieve admin' });
//     }
// };

exports.addDemandeQuitterTerritoire = async (req, res, next) => {
    console.log(req.body);
    try {
      const newDemandeQuitterTerritoire = new DemandeQuitterTerritoire({
        professeur: req.body.professeur, 
        description: req.body.description, 
        de_date: req.body.de_date, 
        a_date: req.body.a_date,
        universite: req.body.universite,
      });
  
      const savedDemande = await newDemandeQuitterTerritoire.save();
  
      res.status(200).json(savedDemande);
    } catch (error) {
      console.error('Error adding demande:', error);
      res.status(500).json({ error: 'Failed to add demande' });
    }
  };