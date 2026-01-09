import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Base URL for API requests
const API_BASE_URL = "http://localhost:5000";

// API Service functions
const hrService = {
  // Get all HRs
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hr/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching HRs:', error);
      throw error;
    }
  },

  // Create new HR
  create: async (hrData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/hr/createHr`, hrData);
      return response.data;
    } catch (error) {
      console.error('Error creating HR:', error);
      throw error;
    }
  },

  // Update HR
  update: async (id, hrData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/hr/update/${id}`, hrData);
      return response.data;
    } catch (error) {
      console.error('Error updating HR:', error);
      throw error;
    }
  },

  // Delete HR
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/hr/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting HR:', error);
      throw error;
    }
  }
};

function HRList() {
  const navigate = useNavigate();
  const [hrs, setHrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHr, setSelectedHr] = useState(null);
  const [showJdModal, setShowJdModal] = useState(false);
  const [selectedJd, setSelectedJd] = useState(null);
  const [showJdDetailsModal, setShowJdDetailsModal] = useState(false);
  const [jdFilter, setJdFilter] = useState("all");
  const [hrSearch, setHrSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingHr, setEditingHr] = useState(null);

  // Fetch HRs on component mount
  useEffect(() => {
    fetchHRs();
    
    // Listen for the custom event to refresh the list
    const handleRefresh = () => fetchHRs();
    window.addEventListener('hrCreated', handleRefresh);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('hrCreated', handleRefresh);
    };
  }, []);

  const fetchHRs = async () => {
    try {
      setLoading(true);
      const data = await hrService.getAll();
      console.log('Fetched HRs:', data);
      setHrs(data);
      setError(null);
      return data; // Return the data for potential use
    } catch (err) {
      setError('Failed to fetch HRs. Please try again later.');
      console.error('Error fetching HRs:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Function to manually refresh the HR list
  // Delete HR
  const deleteHr = async (hrId) => {
    if (!window.confirm("Are you sure you want to delete this HR?")) return;
    try {
      await hrService.delete(hrId);
      setHrs(prev => prev.filter(hr => hr._id !== hrId));
    } catch (err) {
      console.error('Error deleting HR:', err);
      setError('Failed to delete HR');
    }
  };

  const refreshHRList = () => {
    console.log('Refreshing HR list...');
    return fetchHRs();
  };

  // Handle edit button click
  const handleEditClick = (hr) => {
    setEditingHr(hr);
    setEditFormData({
      name: hr.name || '',
      email: hr.email || '',
      role: hr.role || 'HR',
      experience: hr.experience || 0,
      department: hr.department || '',
      isActive: hr.isActive ?? true
    });
  };

  // Handle form input changes
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Save edited HR data
  const handleSaveEdit = async (updatedData) => {
    if (!editingHr?._id) return;
    
    try {
      await hrService.update(editingHr._id, {
        ...updatedData,
        experience: Number(updatedData.experience) || 0
      });
      
      // Refresh the HR list
      await fetchHRs();
      setEditingHr(null);
    } catch (error) {
      console.error('Error updating HR:', error);
      setError('Failed to update HR profile');
    }
  };

  // Handle edit button click
  const handleEditHr = (hr) => {
    setEditingHr(hr);
  };

  // Toggle HR active/inactive status
  const toggleStatus = async (hrId, newStatus) => {
    try {
      // Convert dropdown value to boolean isActive expected by backend
      const isActive = newStatus === "Active";
      const res = await hrService.update(hrId, { isActive });
      const updatedHr = res.data?.data || res.data || res;
      const updatedData = {
        ...updatedHr,
        status: updatedHr.isActive ? "Active" : "Inactive",
      };
      setHrs(prev => prev.map(hr => (hr._id === updatedData._id ? updatedData : hr)));
    } catch (err) {
      console.error('Error updating HR status:', err);
      setError('Failed to update HR status');
    }
  };

  // Get unique departments
  const jdTitles = [
    "all",
    ...new Set(
      hrs
        .map(hr => hr.department)
        .filter(Boolean) // Remove any undefined/null values
        .sort((a, b) => a.localeCompare(b))
    ),
  ].filter(dept => dept && dept.trim() !== ''); // Ensure no empty strings

  // Filter HRs by department and name search
  // Map backend boolean isActive to string status for UI
  const mappedHrs = hrs.map(hr => ({
    ...hr,
    status: hr.isActive ? "Active" : "Inactive",
  }));

  const filteredHrs = mappedHrs.filter((hr) => {
    const matchesDepartment = 
      jdFilter === "all" || 
      (hr.department && hr.department.toLowerCase() === jdFilter.toLowerCase());
    const matchesName = hr.name && hr.name.toLowerCase().includes(hrSearch.toLowerCase());
    return matchesDepartment && matchesName;
  }).map(hr => ({
    ...hr,
    // Ensure all required fields have default values if missing
    _id: hr._id || Math.random().toString(36).substr(2, 9), // Generate a temporary ID if missing
    name: hr.name || 'Unnamed HR',
    email: hr.email || '',
    role: hr.role || 'HR',
    experience: hr.experience || 0,
    status: hr.status || 'Active',
    jds: hr.jds || []
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <label htmlFor="jd-filter" className="text-sm font-semibold text-gray-600">
                  Filter by Department:
                </label>
                <select
                  id="jd-filter"
                  value={jdFilter}
                  onChange={(e) => setJdFilter(e.target.value)}
                  className="w-full sm:w-40 rounded-md border border-gray-300 px-3 py-1 text-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                >
                  {jdTitles.map((title) => (
                    <option key={title} value={title}>
                      {title === "all" ? "All Departments" : title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <label htmlFor="hr-search" className="text-sm font-semibold text-gray-600">
                  Search HR:
                </label>
                <input
                  id="hr-search"
                  type="text"
                  value={hrSearch}
                  onChange={(e) => setHrSearch(e.target.value)}
                  placeholder="Enter HR name"
                  className="w-full sm:w-60 rounded-md border border-gray-300 px-3 py-1 text-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  onClick={() => {
                    navigate('/company/hr-profile/new');
                  }}
                >
                  Create HR
                </button>
              </div>
            </div>
            {/* HR List as cards */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
              {filteredHrs.length === 0 ? (
                <p className="text-gray-600 col-span-full text-center">No HRs found matching the filters.</p>
              ) : (
                filteredHrs.map((hr) => (
                  <div key={hr._id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col min-h-[300px]">
                    <div className="p-6 border-b">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold">{hr.name}</span>
                        <StatusDropdown
                          currentStatus={hr.status}
                          onChange={(newStatus) => toggleStatus(hr._id, newStatus)}
                        />
                      </div>
                      <div className="text-sm text-gray-600">{hr.email}</div>
                      <div className="mt-1 text-sm">Experience: {hr.experience} yrs</div>
                      <div className="text-sm">Role: {hr.role}</div>
                    </div>
                    <div className="flex flex-1 flex-col justify-end p-6 space-y-2">
                      <button
                        onClick={() => navigate(`/company/hr-profile/${hr._id}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded w-full"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => {
                          setSelectedHr(hr);
                          setShowJdModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full"
                      >
                        List of JD
                      </button>
                      <div className="flex justify-end space-x-3 pt-2">
                        {/* Edit icon */}
                        <button
                          type="button"
                          onClick={() => handleEditHr(hr)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          title="Edit HR"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.625 2.625 0 0 1 3.713 3.713L7.5 20.275 3 21l.725-4.5 13.137-13.013Z" />
                          </svg>
                        </button>
                        {/* Delete icon */}
                        <button
                          type="button"
                          onClick={() => deleteHr(hr._id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Delete HR"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6v12m6-12v12M4 6l1 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-14M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* JD List Modal */}
      {showJdModal && selectedHr && (
        <Modal onClose={() => setShowJdModal(false)} title={`JDs uploaded by ${selectedHr.name}`}>
          {selectedHr.jds.length === 0 ? (
            <p className="p-4 text-gray-600">No JDs found for this HR.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-3 py-2 text-left">JD Title</th>
                  <th className="border px-3 py-2 text-left">Department</th>
                  <th className="border px-3 py-2 text-left">Location</th>
                  <th className="border px-3 py-2 text-left">Date Uploaded</th>
                  <th className="border px-3 py-2 text-left">Status</th>
                  <th className="border px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedHr.jds.map((jd) => (
                  <tr key={jd.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{jd.title}</td>
                    <td className="border px-3 py-2">{jd.department}</td>
                    <td className="border px-3 py-2">{jd.location}</td>
                    <td className="border px-3 py-2">{jd.dateUploaded}</td>
                    <td className="border px-3 py-2">{jd.status}</td>
                    <td className="border px-3 py-2">
                      <button
                        onClick={() => {
                          setSelectedJd(jd);
                          setShowJdDetailsModal(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal>
      )}

      {/* JD Details Modal */}
      {showJdDetailsModal && selectedJd && (
        <Modal
          title={`JD Details: ${selectedJd.title}`}
          onClose={() => setShowJdDetailsModal(false)}
          className="max-w-3xl"
        >
          <div className="space-y-2">
            <DetailItem label="Title" value={selectedJd.title} />
            <DetailItem label="Department" value={selectedJd.department} />
            <DetailItem label="Reporting To" value={selectedJd?.details?.reportingTo || 'N/A'} />
            <DetailItem label="Description" value={selectedJd?.details?.description || 'N/A'} />
            <DetailItem label="Salary Range" value={selectedJd?.details?.salaryRange || 'N/A'} />
            <DetailItem label="Experience Required" value={selectedJd?.details?.experienceRequired || 'N/A'} />
            <DetailItem label="Location" value={selectedJd?.location || 'N/A'} />
            <DetailItem label="Date Uploaded" value={selectedJd?.dateUploaded || 'N/A'} />
            <DetailItem label="Status" value={selectedJd?.status || 'N/A'} />
            <DetailItem label="Number of Applicants" value={selectedJd?.details?.numberOfApplicants || 'N/A'} />
            <div>
              <span className="font-semibold">Attachments: </span>
              {selectedJd?.details?.attachments?.length > 0 ? (
                selectedJd.details.attachments.map((att, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-blue-600 underline mr-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    {att}
                  </a>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatusDropdown({ currentStatus, onChange }) {
  const [open, setOpen] = useState(false);

  const options = ["Active", "Inactive"];
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex justify-center w-full rounded-md border px-3 py-1 text-sm font-medium ${
          currentStatus === "Active"
            ? "bg-green-500 text-white border-green-600 hover:bg-green-600"
            : "bg-red-500 text-white border-red-600 hover:bg-red-600"
        }`}
      >
        {currentStatus}{" "}
        <svg
          className="ml-1 -mr-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="origin-top-right absolute mt-1 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  option === currentStatus ? "font-semibold bg-gray-100" : ""
                } hover:bg-gray-200`}
                role="menuitem"
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ title, children, onClose, className = "max-w-4xl" }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`bg-white rounded shadow-lg w-full ${className} max-h-[90vh] overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
}

// Edit HR Modal
function EditHrModal({ hr, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: hr?.name || '',
    email: hr?.email || '',
    role: hr?.role || 'HR',
    experience: hr?.experience || 0,
    department: hr?.department || '',
    isActive: hr?.isActive ?? true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!hr) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit HR: {hr.name}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Edit HR Modal */}
      {editingHr && (
        <EditHrModal
          hr={editingHr}
          onClose={() => setEditingHr(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <span className="font-semibold">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

export default HRList;