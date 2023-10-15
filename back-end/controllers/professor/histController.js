const Historique = require("../../models/historique");
const mongoose = require('mongoose');


// mongoose.connect("mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017
const DB_HOST = 'mongo'
//Docker
//const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
//Local
const URI = "mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority"

//mongoose.connect(URI).then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));
mongoose.connect('mongodb://127.0.0.1:27017/ensaj', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.addHist =  async (req, res, next) => {
    console.log(req);
    try {
      const newHistorique = new Historique({
        professeur: '6515b457e26ddce65436f34c', // Replace with the actual ObjectId of the related Professeur
        grade: 'Associate Professor', // Replace with the actual grade
        annee: 2023, // Replace with the actual year
      });
  
      const saveHistorique = await newHistorique.save();
  
      res.status(200).json(saveHistorique);
    } catch (error) {
      console.error('Error adding Historiique:', error);
      res.status(500).json({ error: 'Failed to add Historiique' });
    }
  };

  exports.getHist =  async (req, res, next) => {
    try {
      const profId = req.body.prof;
  
      // Find the agent by ID in your Agent collection
      const hist = await Historique.find({"professeur": profId});
  
      if (!hist) {
        return res.status(404).json({ error: 'Hist not found' });
      }
  
      // Return the hist data as JSON
      res.status(200).json(hist);
    } catch (error) {
      console.error('Error fetching hist by prof ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

