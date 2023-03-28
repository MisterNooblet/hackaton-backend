import Country from "../models/Country.js";
import Cuisine from "../models/Cuisine.js";
import { Error } from 'mongoose'
import { AppError, appErr } from '../utils/AppErrors.js'

export const getCountryNames = async (req, res, next) => {

    try {
        let countries = await Country.find({})
        let countryNames = countries.map(country => country.name)
        res.json({
            message: 'Success',
            data: countryNames
        })
    } catch (error) {
        next(new Error(error))
    }

}

export const getCountry = async (req, res, next) => {

    try {
        let country = await Country.find({ name: req.params.id })
        let cuisines = []
        for (const id of country[0].cuisines) {

            let cuisine = await Cuisine.findById(id)
            cuisines.push(cuisine.name)
        }
        console.log(cuisines);
        res.json({
            message: 'Success',
            data: country,
            cuisines: cuisines
        })
    } catch (error) {
        next(new Error(error))
    }

}