import mongoose from "mongoose";
import colors from 'colors';


const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Server connected to database on ${mongoose.connection.host}` .bgCyan.white);
    } catch (error) {
        console.log(`${error}  .bgRed `);
    }
}

export default connectToDb;