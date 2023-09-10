// Router file
import express from 'express';
import { getMember,getRegions,getZones,getClub,checkMemberId,addMember,memberDetails,updateMemberInfo} from '../../controllers/superadmin/members.js';
import superAuth from "../../middleware/superAdmin.js";

const router = express.Router();

router.get('/getMembers',superAuth, getMember);
router.get('/regions',superAuth,getRegions);
router.get('/zones',superAuth,getZones);
router.get('/clubs',superAuth,getClub);
router.get('/validate',superAuth,checkMemberId);
router.post('/add',superAuth,addMember);
router.get('/member-details',superAuth,memberDetails);
router.post('/update',superAuth,updateMemberInfo);
export default router;