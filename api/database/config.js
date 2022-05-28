const mongoose = require('mongoose');

const connectionDb = async() => {
   try {
      await mongoose.connect(process.env.MONGODB_CNN)
   } catch (error) {
      console.log(error)
   }
}

module.exports = connectionDb;