import express from 'express'
import { getCountry, getCountryNames } from '../controllers/countryController.js'

const router = express.Router()

router.get('/', getCountryNames)
router.get('/:id', getCountry)

export default router