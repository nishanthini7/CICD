const CD = require('../models/candidate');

const getAllCD = async (req, res) => {
  console.log("ln4")
  try {
    const users = await CD.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const jds = await CD.findById(id);
    if (!jds) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(jds);
  } catch (error) {
    console.error('Error fetching Candidate:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const createCD = async (req, res) => {
  const {
    name, email, phone, dob, Address,
    city, state, pinCode, linkedIn, portfolio,
    workExperience, skills, noticePeriod, aboutUs
  } = req.body;

  try {
    const newCD = new CD({
      name,
      email,
      phone,
      dob,
      Address,
      city,
      state,
      pinCode,
      linkedIn,
      portfolio,
      workExperience,
      skills,
      noticePeriod,
      aboutUs
    });

    await newCD.save();
    res.status(201).json({ message: "Candidate created successfully", data: newCD });
  } catch (error) {
    console.error('Error saving candidate:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const updateCD = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCD = await CD.findByIdAndUpdate(id, req.body, {
      new: true,        // Return the updated document
      runValidators: true // Run schema validators
    });
    if (!updatedCD) {
      return res.status(404).json({ message: "CD not found" });
    }

    res.json({ message: "CD updated successfully", data: updatedCD });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE CD by ID
const deleteCD = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCD = await CD.findByIdAndDelete(id);

    if (!deletedCD) {
      return res.status(404).json({ message: "CD not found" });
    }

    res.json({ message: "CD deleted successfully", data: deletedCD });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvitedJDsForCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const candidate = await CD.findById(candidateId)
      .populate('invitedJDs', 'jobTitle description') // fetch JD details
      .select('name email invitedJDs');

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    console.error('Error fetching invited JDs:', error);
    res.status(500).json({ message: error.message });
  }
};
const getInvitedCandidatesByHR = async (req, res) => {
  try {
    const { hrId } = req.params;

    const candidates = await CD.find({ hrId })
      .populate('invitedJDs', 'jobTitle') // show JD title in list
      .select('name email invitedJDs'); // only return necessary fields

    res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching invited candidates:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCD,
  getById,
  createCD,
  updateCD,
    deleteCD,
    getInvitedJDsForCandidate,
    getInvitedCandidatesByHR,
};
