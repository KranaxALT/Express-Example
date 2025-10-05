const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/testDB')
        console.log('DB connected')
    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB