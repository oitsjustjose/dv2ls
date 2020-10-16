import mongoose from 'mongoose'

export default async () => {
    await mongoose.connect(`mongodb://${process.env.MONGO_URI}/Utils`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}