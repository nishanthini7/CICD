import React, { useState } from "react";
import "../../index.css";
import { useNavigate } from 'react-router-dom';
// import Sidebar from "../../components/hr/Sidebar";

// Helper: breakdown bar for skills
function BreakdownBar({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-500">{percent.toFixed(1)}%</span>
      </div>
      {/* <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={${color} h-2.5 rounded-full transition-all duration-300}
          style={{ width: ${percent}% }}
        ></div>
      </div> */}
    </div>
  );
}

// Modal for interview breakdown/details
const InterviewDetails = ({ candidate, onClose }) => {
  if (!candidate) return null;
  const breakdown = candidate.breakdown || {
    communication: Math.min(25, candidate.interviewScore * 0.4),
    technicalSkills: Math.min(25, candidate.interviewScore * 0.3),
    problemSolving: Math.min(25, candidate.interviewScore * 0.2),
    experience: Math.min(25, candidate.interviewScore * 0.1),
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[100]"
            onClick={onClose}
          />
          <div className="z-[110] m-auto max-md:w-[95vw] max-md:px-2 w-[400px] md:w-[480px] bg-white rounded-2xl shadow-2xl animate-fade-in relative">
            <div className="flex justify-between items-center mb-3 border-b border-blue-100 pb-3 pt-4 px-4">
              <h2 className="text-xl font-bold text-blue-700">Interview Score</h2>
              <button
                onClick={onClose}
                className="p-1.ś5 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-gray-500">{candidate.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">
                    {candidate.interviewScore}%
                  </div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
              </div>

              <div className="space-y-4">
                <BreakdownBar
                  label="Communication"
                  percent={breakdown.communication}
                  color="bg-blue-500"
                />
                <BreakdownBar
                  label="Technical Skills"
                  percent={breakdown.technicalSkills}
                  color="bg-green-500"
                />
                <BreakdownBar
                  label="Problem Solving"
                  percent={breakdown.problemSolving}
                  color="bg-yellow-500"
                />
                <BreakdownBar
                  label="Experience"
                  percent={breakdown.experience}
                  color="bg-purple-500"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => alert('Next steps would be handled here')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Next Steps
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Table row for each candidate
const CandidateRow = ({
  name,
  role,
  employmentType,
  workType,
  appliedDate,
  attachments,
  status,
  score,
  interviewScore,
  experience,
  onInterviewClick,
  index,
}) => (
  <tr className="border-b hover:bg-blue-50 transition duration-200 cursor-pointer">
    <td className="py-2 px-4 text-gray-900 whitespace-nowrap font-medium">
      {name}
    </td>
    <td className="py-2 px-4 text-gray-700">{role}</td>
    <td className="py-2 px-4">
      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInterviewClick(index);
          }}
          className={`px-3 py-1 rounded-full font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 min-w-[60px] text-center
            ${
              interviewScore >= 80
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : interviewScore >= 50
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
        >
          {interviewScore}%
        </button>
      </div>
    </td>
    <td className="py-2 px-4 text-blue-800">{employmentType}</td>
    <td className="py-2 px-4">{workType}</td>
    <td className="py-2 px-4">{appliedDate}</td>
    <td className="py-2 px-4">
      <div className="flex flex-wrap gap-2">
        {attachments.map((attach, idx) => (
          <span
            key={idx}
            className="flex items-center text-indigo-600 bg-indigo-50 rounded-full px-2 text-xs"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z" />
            </svg>
            {attach}
          </span>
        ))}
      </div>
    </td>
    <td className="py-2 px-4">
      <span
        className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
          status === "Interview"
            ? "bg-green-100 text-green-800"
            : status === "In-Review"
            ? "bg-purple-100 text-purple-800"
            : status === "Hired"
            ? "bg-blue-100 text-blue-800"
            : status === "Rejected"
            ? "bg-red-100 text-red-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="py-2 px-4 text-right whitespace-nowrap">{experience} yrs</td>
  </tr>
);

const InterviewScore = () => {
  const navigate = useNavigate();
  const candidates = [
    {
      name: "Sophia Turner",
      role: "Legal Advisor",
      employmentType: "Full-time",
      workType: "Hybrid",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "Interview",
      interviewScore: 67,
      department: "Legal",
      position: "Advisor",
      experience: 5,
      location: "New York",
    },
    {
      name: "Lucas Green",
      role: "Software Developer",
      employmentType: "Full-time",
      workType: "Remote",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "In-Review",
      interviewScore: 25,
      department: "Engineering",
      position: "Developer",
      experience: 3,
      location: "San Francisco",
    },
    {
      name: "Emma Wilson",
      role: "Financial Analyst",
      employmentType: "Full-time",
      workType: "Remote",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "Hired",
      interviewScore: 90,
      department: "Finance",
      position: "Analyst",
      experience: 7,
      location: "Chicago",
    },
    {
      name: "Noah Brown",
      role: "Operations Manager",
      employmentType: "Full-time",
      workType: "On-site",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "In-Review",
      interviewScore: 75,
      department: "Operations",
      position: "Manager",
      experience: 8,
      location: "Boston",
    },
    {
      name: "Olivia Smith",
      role: "HR Manager",
      employmentType: "Full-time",
      workType: "Hybrid",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "Hired",
      interviewScore: 98,
      department: "Human Resources",
      position: "Manager",
      experience: 10,
      location: "Seattle",
    },
    {
      name: "Ethan Taylor",
      role: "Network Engineer",
      employmentType: "Full-time",
      workType: "On-site",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "Interview",
      interviewScore: 45,
      department: "IT",
      position: "Engineer",
      experience: 4,
      location: "Austin",
    },
    {
      name: "Mia Davis",
      role: "Customer Support Specialist",
      employmentType: "Contract",
      workType: "Remote",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "Rejected",
      interviewScore: 5,
      department: "Customer Service",
      position: "Specialist",
      experience: 2,
      location: "Denver",
    },
    {
      name: "Ava Johnson",
      role: "Data Scientist",
      employmentType: "Full-time",
      workType: "Remote",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "Interview",
      interviewScore: 80,
      department: "R&D",
      position: "Scientist",
      experience: 6,
      location: "Portland",
    },
    {
      name: "William Moore",
      role: "Marketing Coordinator",
      employmentType: "Full-time",
      workType: "On-site",
      appliedDate: "22-07-2025",
      attachments: ["Resume"],
      status: "Rejected",
      interviewScore: 60,
      department: "Marketing",
      position: "Coordinator",
      experience: 3,
      location: "Miami",
    },
  ];

  // ------ State for filters and modal ------
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    department: "",
    position: "",
    experience: "",
    location: "",
  });
  const [filterDate, setFilterDate] = useState(""); // e.g. '2025-07-22'
  const [showInterviewDetails, setShowInterviewDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Utility: Format a "22-07-2025" string to "2025-07-22"
  const dmyToISO = (dmy) => {
    if (!dmy) return "";
    const [dd, mm, yyyy] = dmy.split("-");
    if (!yyyy) return "";
    return `${yyyy}-${mm}-${dd}`;
  };

  // Filtering logic for candidates
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesName = candidate.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDept =
      !filter.department || candidate.department === filter.department;
    const matchesPos =
      !filter.position || candidate.position === filter.position;
    const matchesExp =
      !filter.experience || candidate.experience === parseInt(filter.experience);
    const matchesLoc =
      !filter.location || candidate.location === filter.location;
    const matchesDate =
      !filterDate || dmyToISO(candidate.appliedDate) === filterDate;
    return (
      matchesName &&
      matchesDept &&
      matchesPos &&
      matchesExp &&
      matchesLoc &&
      matchesDate
    );
  });

  const handleInterviewDetails = (id) => {
    navigate(`/hr/interview/${id}`);
  };

  const handleCloseModal = () => {
    setShowInterviewDetails(false);
    setTimeout(() => document.body.classList.remove("overflow-hidden"), 300);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilter({ department: "", position: "", experience: "", location: "" });
    setFilterDate("");
  };

  // Sticky for table header
  const tableHeadClass = "bg-gradient-to-tr from-blue-50 to-white sticky top-0 z-10";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 pt-8 bg-white min-h-screen rounded-xl shadow-lg text-blue-900">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
            Candidates
          </h1>
          <div className="flex flex-wrap gap-2">
            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-semibold">
              Add
            </button> */}
            <select className="border border-blue-200 px-3 py-2 rounded-full text-blue-600 shadow-sm focus:ring focus:ring-blue-300/30">
              <option>Latest</option>
              <option>Oldest</option>
            </select>
            <input
              type="date"
              className="border border-blue-200 px-3 py-2 rounded-full text-blue-600 shadow-sm"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              placeholder="Filter by date"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search name, role, etc..."
            className="border border-blue-200 px-3 py-2 rounded-full w-full md:w-72 text-blue-700 bg-blue-50 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <select
              className="border border-blue-200 px-3 py-2 rounded-full"
              value={filter.department}
              onChange={(e) =>
                setFilter({ ...filter, department: e.target.value })
              }
            >
              <option value="">All Departments</option>
              <option value="Legal">Legal</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="IT">IT</option>
              <option value="Customer Service">Customer Service</option>
              <option value="R&D">R&D</option>
              <option value="Marketing">Marketing</option>
            </select>
            <select
              className="border border-blue-200 px-3 py-2 rounded-full"
              value={filter.position}
              onChange={(e) =>
                setFilter({ ...filter, position: e.target.value })
              }
            >
              <option value="">All Positions</option>
              <option value="Advisor">Advisor</option>
              <option value="Developer">Developer</option>
              <option value="Analyst">Analyst</option>
              <option value="Manager">Manager</option>
              <option value="Engineer">Engineer</option>
              <option value="Specialist">Specialist</option>
              <option value="Scientist">Scientist</option>
              <option value="Coordinator">Coordinator</option>
            </select>
            <select
              className="border border-blue-200 px-3 py-2 rounded-full"
              value={filter.experience}
              onChange={(e) =>
                setFilter({ ...filter, experience: e.target.value })
              }
            >
              <option value="">All Exp</option>
              {[2, 3, 4, 5, 6, 7, 8, 10].map((y) => (
                <option key={y} value={y}>
                {y}
                </option>
              ))}
            </select>
            <select
              className="border border-blue-200 px-3 py-2 rounded-full"
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
            >
              <option value="">All Cities</option>
              {Array.from(new Set(candidates.map((c) => c.location))).map(
                (loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                )
              )}
            </select>
          </div>
          <button
            className="ml-2 px-4 py-2 bg-gray-100 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-50 transition font-semibold"
            onClick={handleClearFilters}
            type="button"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-blue-100 bg-white shadow">
          <table className="min-w-full text-sm">
            <thead className={tableHeadClass}>
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Applied Role</th>
                <th className="py-3 px-4 text-center w-32">Interview Score</th>
                <th className="py-3 px-4 text-left">Employment Type</th>
                <th className="py-3 px-4 text-left">Work Type</th>
                <th className="py-3 px-4 text-left">Applied Date</th>
                <th className="py-3 px-4 text-left">Attachment</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-right">Experience</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-4 py-10 text-center text-gray-400">
                    <div>
                      <span className="inline-block mb-2">
                        <svg
                          className="w-10 h-10 text-blue-200"
                          fill="none"
                          viewBox="0 0 40 40"
                        >
                          <circle cx="20" cy="20" r="20" fill="currentColor" />
                          <text
                            x="50%"
                            y="55%"
                            textAnchor="middle"
                            fill="#fff"
                            fontSize="14"
                            fontWeight="600"
                            dy=".3em"
                          >
                            ?
                          </text>
                        </svg>
                      </span>
                      <div>No candidates found with the current filters.</div>
                    </div>
                  </td>
                </tr>
              )}
              {filteredCandidates.map((candidate, index) => (
                <CandidateRow
                  key={index}
                  {...candidate}
                  index={index}
                  onInterviewClick={handleInterviewDetails}
                />
              ))}
            </tbody>
          </table>
        </div>
        </div>
        {showInterviewDetails && selectedCandidate && (
          <InterviewDetails candidate={selectedCandidate} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default InterviewScore;