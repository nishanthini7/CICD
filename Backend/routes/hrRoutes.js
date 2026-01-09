const express = require('express');
const router = express.Router();
const { getAllHR,getHRById, createHr ,updateHr,deleteHr,createJD,getAllJD,getHRByJD,updateJD,deleteJD,getIdByJD} = require('../controllers/hrController');


router.get('/get', getAllHR);
router.post('/createHr', createHr); 
router.get('/getByIdHr/:id', getHRById);
router.put('/update/:id', updateHr);            
router.delete('/delete/:id', deleteHr); 
router.post('/createJD', createJD); 
router.get('/getAllJD', getAllJD);
router.get('/getByIdJd/:id', getIdByJD);
router.get('/getByHrIdJd/:id', getHRByJD);
router.put('/updateJD/:id', updateJD);            
router.delete('/deleteJD/:id', deleteJD); 
module.exports = router;