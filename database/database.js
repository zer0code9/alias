const mongoose = require("mongoose");
const { bot } = require('../config');

module.exports = {
    async initializeMongoose() {
      console.log(`Connecting to MongoDb...`);
  
      try {
        await mongoose.connect(bot.db);
  
        console.log("Mongoose: Database connection established");
  
        return mongoose.connection;
      } catch (err) {
        console.log("Mongoose: Failed to connect to database");
        process.exit(1);
      }
    },
  
    /*
    schemas: {
      Guild: require("./schemas/Guild"),
      User: require("./schemas/User"),
    },
    */
  };