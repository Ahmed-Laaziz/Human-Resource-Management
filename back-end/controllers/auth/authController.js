const Agent = require("../../models/agent");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "RandomJWTSecretKey123"


// <<<<<<< HEAD
const URI = "mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority"
const URI2 = "mongodb://127.0.0.1:27017/test"

mongoose.connect(URI).then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017
const DB_HOST = 'mongo'
//Docker
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
// mongoose.connect('mongodb://cluster0.i5myq.mongodb.net:27017/ensaj', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   user: 'ahmed',
//   pass: 'ahmed123'
// });


exports.login =  async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email in the Agent collection (which includes Admin and Professeur)
      const user = await Agent.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      // const passwordMatch = await bcrypt.compare(password, password);
  
      if (password != user.password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // If email and password are valid, generate a JWT token
      /*const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });*/
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });
  
      // Send the token as a response
      res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };