const mongoose =require("mongoose") 

const connectdb = async () => { mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DBSSS'))
.catch((er)=>console.log(er))
}

module.exports = connectdb