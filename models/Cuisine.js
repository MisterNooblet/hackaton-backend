import mongoose from "mongoose"

const CuisineSchema = new mongoose.Schema([
    {
        name: {
            type: String
        },
    }
])

const Cuisine = mongoose.model("Cuisine", CuisineSchema)

export default Cuisine

