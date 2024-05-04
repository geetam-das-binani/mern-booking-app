import express from 'express'
import { getDashboardData } from '../controllers/dashboard.controllers'
const router=express.Router()


router.get("/admin/dashboard-data",getDashboardData)

export {router }