const Professeur = require("../../models/professeur");
const Historique = require("../../models/historique");
const sendEmail = require('../../business/emailSender');
const generateRandomPassword = require('../../business/passwordGenerator');
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
const URI2 = "mongodb://127.0.0.1:27017/test"

mongoose.connect(URI).then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));
// mongoose.connect('mongodb://127.0.0.1:27017/ensaj', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Define a route to retrieve and return data from the "professeur" collection
exports.getProfs = async (req, res, next) => {
    try {
      const allProfesseurs = await Professeur.find({});
      res.status(200).json(allProfesseurs);
    } catch (error) {
      console.error('Error retrieving professeurs:', error);
      res.status(500).json({ error: 'Failed to retrieve professeurs' });
    }
};

exports.addProf =  async (req, res, next) => {
    try {
      const randomPassword = generateRandomPassword(8);

      const userPass = 'HoQhjdslks'

      const newProfesseur = new Professeur({
        nom: req.body.prof.nom, 
        prenom: req.body.prof.prenom, 
        email: req.body.prof.email, 
        password: userPass,
        tel: req.body.prof.tel,
        cin: req.body.prof.cin,
        genre: req.body.prof.genre,
        num_loyer: req.body.prof.num_loyer,
        date_entre_ecole: req.body.prof.date_entre_ecole,
        date_fct_publique: req.body.prof.date_fct_publique,
        cadre: req.body.prof.cadre,
        num_ref: req.body.prof.num_ref,
        date_effective: req.body.prof.date_effective,
        anciennete: req.body.prof.anciennete,
        date_visa: req.body.prof.date_visa
      });
  
      const savedProfesseur = await newProfesseur.save();
      

    // Create an entry in the historique
    const historiqueEntry = new Historique({
      professeur: savedProfesseur._id, // Associate the historique entry with the new professor
      grade: req.body.prof.grade, // Set the default grade here
      classe: req.body.prof.classe, // Set the default class here
      date: new Date() // Set the current date
    });

    await historiqueEntry.save();

// Send an email to the added professor with their login information
    const emailSubject = 'Welcome to Our Platform';
    const emailText = `Dear Professor,\n\nYou have been added to our platform. Your login email is: ${req.body.prof.email}\nYour password is: ${userPass}\n\nPlease use these credentials to log in.\n\nBest regards,\nYour Platform Team`;

    sendEmail(req.body.prof.email, emailSubject, emailText);
      res.status(200).json(savedProfesseur);
    } catch (error) {
      console.error('Error adding professeur:', error);
      res.status(500).json({ error: 'Failed to add professeur' });
    }
};

exports.updateProfesseur = async (req, res, next) => {
  try {
    const professeurId = req.body.prof.id; 
    const professeurUpdates = {
      nom: req.body.prof.nom,
      prenom: req.body.prof.prenom,
      email: req.body.prof.email,
      tel: req.body.prof.tel,
      cin: req.body.prof.cin,
      genre: req.body.prof.genre,
      num_loyer: req.body.prof.num_loyer,
      date_entre_ecole: req.body.prof.date_entre_ecole,
      date_fct_publique: req.body.prof.date_fct_publique,
      num_ref: req.body.prof.num_ref,
      date_effective: req.body.prof.date_effective,
      anciennete: req.body.prof.anciennete,
      date_visa: req.body.prof.date_visa,
    };

    const newHist = {
      grade: req.body.hist.grade,
      cadre: req.body.hist.cadre,
      classe: req.body.hist.classe,
    };

    console.log("the cadre is :"+req.body.hist.cadre)

    const hist = await Historique.find({ "professeur": professeurId }).sort({ date: -1 });

    const changesDetected = hist.length > 0 &&
      (newHist.classe != hist[0].classe || newHist.grade != hist[0].grade || newHist.cadre != hist[0].cadre);


    const updatedProfesseur = await Professeur.findByIdAndUpdate(professeurId, professeurUpdates, { new: true });

    if (changesDetected) {
      const newHistoricalRecord = new Historique({
        professeur: professeurId,
        grade: newHist.grade,
        cadre: newHist.cadre,
        classe: newHist.classe,
        date: new Date(), 
      });

      await newHistoricalRecord.save();
    }

    if (!updatedProfesseur) {
      return res.status(404).json({ error: 'Professor not found' });
    }

    res.status(200).json(updatedProfesseur);
  } catch (error) {
    console.error('Error updating professor:', error);
    res.status(500).json({ error: 'Failed to update professor' });
  }
};

