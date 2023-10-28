const DemandeAttestationTravail = require("../../models/dem_attestation_travail");
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


exports.addDemandeAttestationTravail = async (req, res, next) => {
    console.log(req.body);
    try {
      const newDemandeAttestationTravail = new DemandeAttestationTravail({
        professeur: req.body.professeur, 
      });
  
      const savedDemande = await newDemandeAttestationTravail.save();
  
      res.status(200).json(savedDemande);
    } catch (error) {
      console.error('Error adding demande:', error);
      res.status(500).json({ error: 'Failed to add demande' });
    }
  };