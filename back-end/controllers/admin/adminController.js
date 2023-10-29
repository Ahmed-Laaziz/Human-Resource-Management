const Admin = require("../../models/admin");
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
const URI2 = "mongodb://127.0.0.1:27017/test"

mongoose.connect(URI2).then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));


// mongoose.connect('mongodb://cluster0.i5myq.mongodb.net:27017/ensaj', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   user: 'ahmed',
//   pass: 'ahmed123'
// });

// Add a route to retrieve and display a list of Professeurs
exports.getAdmins = async (req, res, next) => {
    try {
      const allAdmins = await Admin.find({});
      res.status(200).json(allAdmins);
    } catch (error) {
      console.error('Error retrieving admin:', error);
      res.status(500).json({ error: 'Failed to retrieve admin' });
    }
};

exports.addAdmin = async (req, res, next) => {
    console.log(req);
    try {
      const newAdmin = new Admin({
        nom: req.body.nom, 
        prenom: req.body.prenom, 
        email: req.body.email, 
        password: req.body.password,
        tel: req.body.tel,
        cin: req.body.cin,
        genre: req.body.genre,
        fonction: req.body.fonction,
      });
  
      const savedAdmin = await newAdmin.save();
  
      res.status(200).json(savedAdmin);
    } catch (error) {
      console.error('Error adding administrator:', error);
      res.status(500).json({ error: 'Failed to add administrator' });
    }
  };