import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Building, Users, MapPin, Mail, Phone, Calendar, Menu } from 'lucide-react';

const CompanyManagementDashboard = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'admin@techcorp.com',
      phone: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA 94025',
      employees: 150,
      registeredDate: '2023-01-15',
      status: 'Active',
      industry: 'Technology'
    },
    {
      id: 2,
      name: 'Global Logistics Ltd',
      email: 'contact@globallogistics.com',
      phone: '+1-555-0456',
      address: '456 Commerce Ave, New York, NY 10001',
      employees: 320,
      registeredDate: '2023-03-22',
      status: 'Active',
      industry: 'Logistics'
    },
    {
      id: 3,
      name: 'Creative Design Studio',
      email: 'hello@creativedesign.com',
      phone: '+1-555-0789',
      address: '789 Art District, Los Angeles, CA 90028',
      employees: 45,
      registeredDate: '2023-06-10',
      status: 'Inactive',
      industry: 'Design'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    employees: '',
    industry: '',
    status: 'Active'
  });

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      employees: '',
      industry: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEdit = (company) => {
    setModalMode('edit');
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      email: company.email,
      phone: company.phone,
      address: company.address,
      employees: company.employees.toString(),
      industry: company.industry,
      status: company.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(company => company.id !== id));
    }
  };

  const handleSubmit = () => {
    
    if (modalMode === 'add') {
      const newCompany = {
        id: Math.max(...companies.map(c => c.id)) + 1,
        ...formData,
        employees: parseInt(formData.employees),
        registeredDate: new Date().toISOString().split('T')[0]
      };
      setCompanies([...companies, newCompany]);
    } else {
      setCompanies(companies.map(company =>
        company.id === selectedCompany.id
          ? { ...company, ...formData, employees: parseInt(formData.employees) }
          : company
      ));
    }
    
    setShowModal(false);
    setSelectedCompany(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow h-16 flex-shrink-0 flex items-center px-6">
        <h1 className="text-xl font-semibold text-gray-800">Company Management</h1>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="w-full bg-gray-50 p-6">
            {/* Search and Add Section */}
            <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Company</span>
                </button>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{company.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          company.status === 'Active' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {company.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(company)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-300 border border-blue-200"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-300 border border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{company.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{company.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{company.address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{company.employees} employees</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{company.registeredDate}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-200">
                        {company.industry}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or add a new company.</p>
              </div>
            )}

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {modalMode === 'add' ? 'Add New Company' : 'Edit Company'}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Employees</label>
                        <input
                          type="number"
                          name="employees"
                          value={formData.employees}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="Active" className="bg-white">Active</option>
                          <option value="Inactive" className="bg-white">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Industry</label>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 shadow-lg"
                      >
                        {modalMode === 'add' ? 'Add Company' : 'Update Company'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagementDashboard;