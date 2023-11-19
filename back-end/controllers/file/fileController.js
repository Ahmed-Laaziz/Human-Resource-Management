// File controller (fileController.js)
const File = require('../../models/files');
const mongoose = require('mongoose');
// fileController.js (Controller)
const multer = require('multer');
const path = require('path');

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


const uploadFile = async (req, res) => {
    try {
      const { title, professeurId } = req.body; // Assuming the professor's ID is sent in the request body
      const fileName = req.file.filename;
  
      // Create a new PDF record with the provided professor's ID
      await File.create({ title, pdf: fileName, professeur: professeurId });
  
      res.send({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  };
  

  const getFiles = async (req, res) => {
    try {
      const data = await File.find({});
      res.send({ status: "ok", data });
    } catch (error) {
      res.json({ status: 'error', error: error.message });
    }
  };
  

  // Define a route to get agent data by ID
const getFilesForProfesseur = async (req, res) => {
    try {
      const professeurId = req.params.professeurId;
  
      // Use Mongoose to find all demandes with the matching professeur ID and sort them by createdAt in descending order (newest to oldest)
      const files = await File.find({ professeur: professeurId })
        .sort({ createdAt: -1 });
  
      res.json(files);
    } catch (error) {
      console.error('Error fetching demandes:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = {getFiles,uploadFile, getFilesForProfesseur};
