const Agent = require("../../models/agent");
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

// Define a route to get agent data by ID
exports.getAgent =  async (req, res, next) => {
    try {
      const agentId = req.params.id;
  
      // Find the agent by ID in your Agent collection
      const agent = await Agent.findById(agentId);
  
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
  
      // Return the agent data as JSON
      res.status(200).json(agent);
    } catch (error) {
      console.error('Error fetching agent by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };