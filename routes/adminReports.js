import express from "express";
import { getReports,getPoints,addReport} from "../controllers/adminReports.js";
import auth from '../middleware/auth.js';

const  router=express.Router();

router.get('/reports',getReports);
router.get('/points',auth,getPoints)
router.post('/addreport',auth,addReport)


export default router;