// const db=require("mongoose");

// function connection(){

// db.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@{process.env.MONGO_DB_CLUSTER}.yygx9.mongodb.net/${process.env.MONGO_DB_NAME}`)
// .then(()=>{console.log("successfully connected")})
// .catch((err)=>{console.log("error  while connecting",err)})
// }
// module.exports=connection
 const mongoose = require("mongoose");

async function connection() {
    try {
      await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.yygx9.mongodb.net/${process.env.MONGO_DB_NAME}`, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        connectTimeoutMS: 50000, // Increase timeout
        socketTimeoutMS: 50000
      });
      console.log("Successfully connected to the database");
    } catch (err) {
      console.error("Error while connecting to MongoDB:", err);
    }
  }
  
  module.exports = connection;
  