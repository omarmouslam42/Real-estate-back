import mongoose from "mongoose";

const connectDB = async () => {
    return await mongoose.connect(process.env.DB_LOCAL)
    // .then(res=> console.log(`DB connected successfully ....`))
    // .catch(err=> console.log(`Faild to connect DB...${err}`))
}
export default connectDB