

const HR = require('../models/hrModel');
const JD = require('../models/JD');

const getAllHR = async (req, res) => {
  try {
    const users = await HR.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHRById = async (req, res) => {
  try {
    const { id } = req.params;

    const hr = await HR.findById(id);
    if (!hr) {
      return res.status(404).json({ message: "HR not found" });
    }

    res.json(hr);
  } catch (error) {
    console.error('Error fetching HR:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const createHr = async (req, res) => {


  const { name, email, phoneNumber, role, department, workLocation } = req.body;

  try {
    const newHR = new HR({
      name,
      email,
      phoneNumber,
      role,
      department,
      workLocation
    });

    await newHR.save();
    res.status(201).json({message:"HR created successfully",Data: newHR});
  } catch (error) {
    console.error('Error saving HR:', error.message);
    res.status(400).json({ message: error.message });
  }
};


const updateHr = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedHR = await HR.findByIdAndUpdate(id, req.body, {
      new: true,        // Return the updated document
      runValidators: true 
    });

    if (!updatedHR) {
      return res.status(404).json({ message: "HR not found" });
    }

    res.json({ message: "HR updated successfully", data: updatedHR });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE HR by ID
const deleteHr = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHR = await HR.findByIdAndDelete(id);

    if (!deletedHR) {
      return res.status(404).json({ message: "HR not found" });
    }

    res.json({ message: "HR deleted successfully", data: deletedHR });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//JD API

const createJD = async (req, res) => {
  const { hrId, jobTitle, primarySkills, secondarySkills, mustSkills, experienceYear, description } = req.body;

  try {
    const newJD = new JD({
      hrId,
      jobTitle,
      primarySkills,
      secondarySkills,
      mustSkills,
      experienceYear,
      description
    });

    await newJD.save();
    res.status(201).json({ message: "JD created successfully", Data: newJD });
  } catch (error) {
    console.error('Error saving JD:', error.message);
    res.status(400).json({ message: error.message });
  }
};


const getAllJD = async (req,res)=>{
  
  try{
    const jds = await JD.find();
    res.json(jds);
  }catch(error){
    res.status(500).json({message:error.message});
  }
}


const getIdByJD = async (req, res) => {
  try {
    const { id } = req.params;

    const jds = await JD.findById(id);
    if (!jds) {
      return res.status(404).json({ message: "JD not found" });
    }

    res.json(jds);
  } catch (error) {
    console.error('Error fetching JD:', error.message);
    res.status(500).json({ message: error.message });
  }
};
const getHRByJD = async (req, res) => {
  try {
    const { id } = req.params;

    const jd = await JD.findById(id).populate('hrId', 'name email'); 

    if (!jd) {
      return res.status(404).json({ message: "JD not found" });
    }

    res.status(200).json({
      message: "JD fetched successfully",
      jd
    });

  } catch (error) {
    console.error("Error fetching JD:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const updateJD = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedJD = await JD.findByIdAndUpdate(id, req.body, {
      new: true,        // Return the updated document
      runValidators: true // Run schema validators
    });

    if (!updatedJD) {
      return res.status(404).json({ message: "JD not found" });
    }

    res.json({ message: "JD updated successfully", data: updatedJD });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE HR by ID
const deleteJD = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHR = await JD.findByIdAndDelete(id);

    if (!deletedHR) {
      return res.status(404).json({ message: "JD not found" });
    }

    res.json({ message: "JD deleted successfully", data: deletedHR });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllHR,
  getHRById,
  createHr,
  updateHr,
  deleteHr,
  createJD,
  getHRByJD,
  getAllJD,
  updateJD,
  deleteJD,
  getIdByJD
};