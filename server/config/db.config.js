const mongoose = require('mongoose');

const dbConfig = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connection: Successful");
    }catch(err){
        console.log("Error: " + err.message);
        process.exit(1);
    }
}

module.exports = dbConfig;