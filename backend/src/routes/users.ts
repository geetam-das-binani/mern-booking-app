import express from 'express'
import { registerHandler ,loginHandler,logoutHandler,getProfileDetails} from '../controllers/users.controller'
import { registerValidator, validator ,loginValidator} from '../validator/validators'
import { verifyToken } from '../middlewares/auth.middleware'

const router=express.Router()


router.post("/register", registerValidator() ,validator,registerHandler)
router.post("/login", loginValidator() ,validator,loginHandler)
router.post('/logout',logoutHandler)
// ! user have to be authenticated to access below routes
router.get("/me",verifyToken,getProfileDetails)

export default router 