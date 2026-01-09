import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

const CreateHR = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'HR',
    phoneNumber: '',
    department: 'Human Resources',
    workLocation: '',
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post HR data to backend
      await axios.post(`${API_BASE_URL}/hr/createHr`, formData);
      // Dispatch global event for list refresh
      window.dispatchEvent(new Event('hrCreated'));
      // Navigate back to HR list
      navigate('/company/hr-list');
    } catch (error) {
      console.error('Error creating HR:', error);
      alert('Failed to create HR. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg border">
          <div className="px-6 py-4 bg-indigo-600 rounded-t-lg">
            <h3 className="text-xl font-semibold text-white">Create New HR Profile</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  autoFocus
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., john@example.com"
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option>HR</option>
                  <option>Senior HR</option>
                  <option>HR Manager</option>
                  <option>HR Director</option>
                </select>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g., +91 98765 43210"
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g., Human Resources"
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="workLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Location
                </label>
                <input
                  type="text"
                  name="workLocation"
                  id="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                  placeholder="e.g., Chennai Office"
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="py-2 px-4 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
              >
                Create HR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateHR;
