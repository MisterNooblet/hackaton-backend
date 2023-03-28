import mongoose from "mongoose"

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tip: {
        type: Number,
        default: 0
    },
    cuisines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cuisine'
        },
    ],
})

const Country = mongoose.model("Country", CountrySchema)

export default Country