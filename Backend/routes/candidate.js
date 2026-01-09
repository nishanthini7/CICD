const express = require('express');
const router = express.Router();
const { getAllCD, getById,createCD ,updateCD,deleteCD,getInvitedCandidatesByHR,getInvitedJDsForCandidate }= require('../controllers/candidatecontroller');


router.get('/get', getAllCD);
router.get('/getById/:id', getById);
router.post('/createCD', createCD); 
router.put('/update/:id', updateCD);            
router.delete('/delete/:id', deleteCD); 
router.get('/invited/hr/:hrId', getInvitedCandidatesByHR);
router.get('/invited/jds/:candidateId', getInvitedJDsForCandidate);
module.exports = router;