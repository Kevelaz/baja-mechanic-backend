import { Router } from 'express'
import * as scheduleController from '../controllers/scheduleController.js'

const router = Router()

router.post('/', scheduleController.submitForm)

export { router }
