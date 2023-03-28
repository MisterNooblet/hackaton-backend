import mongoose from 'mongoose' 

const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('db connected')
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default dbConnect