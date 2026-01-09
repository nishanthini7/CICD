import React, { useState } from 'react';
import { Eye, CalendarCheck2, Users, Search, Filter, MoreVertical, X, Mail, Phone, MapPin, Briefcase, FileText, Linkedin, Globe, GraduationCap, Briefcase as BriefcaseIcon, Award, DollarSign, Clock, MoveRight } from 'lucide-react';

// Verification Modal for Schedule Interview
const ScheduleModal = ({ selectedIds, onClose }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const selectedCandidates = mockCandidates.filter(candidate => 
    selectedIds.includes(candidate.id)
  );

  const handleConfirmSchedule = () => {
    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Interviews scheduled for candidates: ${selectedIds}`);
      alert(`Successfully scheduled interviews for ${selectedIds.length} candidate(s)!`);
      setIsConfirming(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        {/* Header */}
        {/* <div className="flex items-center mb-4">
          <div className="bg-yellow-100 rounded-full p-2 mr-3">
            <CalendarCheck2 className="text-yellow-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Interview Scheduling
          </h3>
        </div> */}

        {/* Confirmation Message */}
        {/* <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to schedule interviews for the following {selectedIds.length} candidate{selectedIds.length > 1 ? 's' : ''}?
          </p>
          
          {/* Candidate List */}
          {/* <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Candidates:</h4>
            <div className="space-y-2">
              {selectedCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between bg-white rounded p-3 border border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">{candidate.name}</div>
                    <div className="text-sm text-gray-500">{candidate.position}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Score: {candidate.screeningScore}/100
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${statusConfig[candidate.status].bg} ${statusConfig[candidate.status].text}`}>
                      {candidate.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> 
        </div>
           */}

        {/* Warning/Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">Important Notes:</h4>
              <div className="mt-1 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Interview invitations will be sent automatically via email</li>
                  <li>Candidates will receive calendar invites with meeting details</li>
                  <li>Status will be updated to "Scheduled L1" after confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmSchedule}
            disabled={isConfirming}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isConfirming ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Scheduling...</span>
              </>
            ) : (
              <>
                <CalendarCheck2 size={16} />
                <span>Confirm & Schedule</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const mockCandidates = [
  { 
    id: 1, 
    name: 'Priya P', 
    status: 'New', 
    screeningScore: null, 
    interviewScore: null, 
    appliedDate: '2024-01-15', 
    position: 'Frontend Developer',
    email: 'priya.p@example.com',
    phone: '+91 9876543210',
    dob: '15-05-1992',
    address: '123 Tech Park, MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    zip: '560001',
    linkedin: 'linkedin.com/in/priyap',
    portfolio: 'priyaportfolio.com',
    education: 'B.Tech in Computer Science, IIT Bombay (2014)',
    experience: '5+ years as Frontend Developer',
    skills: ['JavaScript', 'React', 'Redux', 'HTML/CSS', 'Responsive Design'],
    certifications: 'AWS Certified Developer, Google Cloud Professional',
    salary: '₹15,00,000 - ₹20,00,000 per annum',
    noticePeriod: '30 days',
    relocate: 'Yes',
    source: 'LinkedIn Job Posting'
  },
  { 
    id: 2, 
    name: 'Karthik K', 
    status: 'Waiting to Schedule', 
    screeningScore: 84, 
    interviewScore: null, 
    appliedDate: '2024-01-12', 
    position: 'Backend Developer',
    email: 'karthik.k@example.com',
    phone: '+91 9876543211',
    dob: '22-08-1990',
    address: '456 Developer Street',
    city: 'Hyderabad',
    state: 'Telangana',
    zip: '500081',
    linkedin: 'linkedin.com/in/karthikk',
    portfolio: 'karthikdev.com',
    education: 'M.Tech in Computer Science, IIIT Hyderabad (2013)',
    experience: '7+ years as Backend Developer',
    skills: ['Node.js', 'Python', 'Docker', 'AWS', 'Microservices'],
    certifications: 'AWS Solutions Architect, MongoDB Certified',
    salary: '₹18,00,000 - ₹22,00,000 per annum',
    noticePeriod: '60 days',
    relocate: 'No',
    source: 'Company Website'
  },
  { 
    id: 3, 
    name: 'Aisha R', 
    status: 'Completed', 
    screeningScore: 76, 
    interviewScore: 88, 
    appliedDate: '2024-01-10', 
    position: 'Full Stack Developer',
    email: 'aisha.r@example.com',
    phone: '+91 9876543212',
    dob: '10-12-1988',
    address: '789 Tech Hub',
    city: 'Pune',
    state: 'Maharashtra',
    zip: '411001',
    linkedin: 'linkedin.com/in/aishar',
    portfolio: 'aishadev.com',
    education: 'BE in Computer Engineering, COEP (2011)',
    experience: '9+ years as Full Stack Developer',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Docker', 'Kubernetes'],
    certifications: 'AWS Certified, Google Cloud Professional',
    salary: '₹22,00,000 - ₹25,00,000 per annum',
    noticePeriod: '45 days',
    relocate: 'Yes',
    source: 'Employee Referral'
  },
  { 
    id: 4, 
    name: 'Rajesh M', 
    status: 'Under Validation', 
    screeningScore: null, 
    interviewScore: null, 
    appliedDate: '2024-01-14', 
    position: 'DevOps Engineer',
    email: 'rajesh.m@example.com',
    phone: '+91 9876543213',
    dob: '05-03-1991',
    address: '321 Cloud Street',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zip: '600001',
    linkedin: 'linkedin.com/in/rajeshm',
    portfolio: 'rajeshops.com',
    education: 'B.Tech in IT, Anna University (2012)',
    experience: '6+ years in DevOps',
    skills: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD', 'Docker'],
    certifications: 'AWS DevOps Professional, CKA',
    salary: '₹20,00,000 - ₹24,00,000 per annum',
    noticePeriod: '30 days',
    relocate: 'Yes',
    source: 'Job Portal'
  },
  { 
    id: 5, 
    name: 'Sneha T', 
    status: 'Scheduled interview', 
    screeningScore: 92, 
    interviewScore: null, 
    appliedDate: '2024-01-08', 
    position: 'UI/UX Designer',
    email: 'sneha.t@example.com',
    phone: '+91 9876543214',
    dob: '18-07-1993',
    address: '654 Design Avenue',
    city: 'Bangalore',
    state: 'Karnataka',
    zip: '560001',
    linkedin: 'linkedin.com/in/snehat',
    portfolio: 'sneha.design',
    education: 'B.Des in Interaction Design, NID (2015)',
    experience: '6+ years in UI/UX Design',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
    certifications: 'Google UX Design Professional',
    salary: '₹16,00,000 - ₹19,00,000 per annum',
    noticePeriod: '30 days',
    relocate: 'No',
    source: 'Design Community'
  },
];

const statusConfig = {
  'New': { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-400' },
  'Under Validation': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  'Waiting to Schedule': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  'Scheduled interview': { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  'Completed': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'offer rollout': { bg: 'bg-indigo-100', text: 'text-indigo-800', dot: 'bg-indigo-500' },
};

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([...mockCandidates]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const eligibleCandidates = filteredCandidates.filter(candidate => isEligible(candidate.status));
    const allEligibleIds = eligibleCandidates.map(c => c.id);
    
    if (selectedIds.length === allEligibleIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allEligibleIds);
    }
  };

  const isEligible = (status) => status === 'Waiting to Schedule';

  // Handler to update a candidate's status
  const handleStatusChange = (id, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const scoreOptions = ['High', 'Medium', 'Low'];

  // Handler to toggle edit/save
  const handleEdit = (id) => setEditingId(id);
  const handleSave = () => setEditingId(null);

  // Handler to update scores
  const handleScoreChange = (id, field, value) => {
    const numeric = value === '' ? null : Math.max(0, Math.min(100, Number(value)));
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, [field]: numeric } : c));
  };

  // Enhanced filtering logic
  const filteredCandidates = candidates.filter(candidate => {
    // Search filter
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    // Position filter
    const matchesPosition = positionFilter === 'all' || candidate.position === positionFilter;
    
    // Score filter
    let matchesScore = true;
    if (scoreFilter !== 'all') {
      const score = candidate.screeningScore || candidate.interviewScore;
      switch (scoreFilter) {
        case 'excellent':
          matchesScore = score >= 90;
          break;
        case 'good':
          matchesScore = score >= 75 && score < 90;
          break;
        case 'average':
          matchesScore = score >= 60 && score < 75;
          break;
        case 'below-average':
          matchesScore = score < 60;
          break;
        case 'not-scored':
          matchesScore = !score;
          break;
        default:
          matchesScore = true;
      }
    }
    
    // Date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const appliedDate = new Date(candidate.appliedDate);
      const today = new Date();
      const daysDiff = Math.floor((today - appliedDate) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
        case 'quarter':
          matchesDate = daysDiff <= 90;
          break;
        default:
          matchesDate = true;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPosition && matchesScore && matchesDate;
  });

  const eligibleCount = filteredCandidates.filter(c => isEligible(c.status)).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={16} />
            <span>{filteredCandidates.length} of {mockCandidates.length} candidates</span>
            {(statusFilter !== 'all' || positionFilter !== 'all' || scoreFilter !== 'all' || dateFilter !== 'all') && (
              <span className="text-indigo-600 font-medium">(filtered)</span>
            )}
          </div>
        </div>
        <p className="text-gray-600">Manage and track candidate applications and interviews</p>
      </div>

      {/* Enhanced Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by candidate name, position, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <Filter size={16} className="mr-2" />
              Filter Candidates
            </h3>
            <button
              onClick={() => {
                setStatusFilter('all');
                setPositionFilter('all');
                setScoreFilter('all');
                setDateFilter('all');
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                {Object.keys(statusConfig).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Positions</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
              </select>
            </div>

            {/* Score Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Score Range</label>
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Scores</option>
                <option value="excellent">Excellent (90-100)</option>
                <option value="good">Good (75-89)</option>
                <option value="average">Average (60-74)</option>
                <option value="below-average">Below Average (&lt;60)</option>
                <option value="not-scored">Not Scored</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Applied Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(statusFilter !== 'all' || positionFilter !== 'all' || scoreFilter !== 'all' || dateFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-700">Active Filters:</span>
                {statusFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Status: {statusFilter}
                    <button
                      onClick={() => setStatusFilter('all')}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {positionFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Position: {positionFilter}
                    <button
                      onClick={() => setPositionFilter('all')}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {scoreFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Score: {scoreFilter}
                    <button
                      onClick={() => setScoreFilter('all')}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {dateFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Date: {dateFilter}
                    <button
                      onClick={() => setDateFilter('all')}
                      className="ml-1 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === eligibleCount && eligibleCount > 0}
                    onChange={handleSelectAll}
                    disabled={eligibleCount === 0}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate fitment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interview Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => {
                const statusStyle = statusConfig[candidate.status];
                return (
                  <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      {isEligible(candidate.status) ? (
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(candidate.id)}
                          onChange={() => handleCheckboxChange(candidate.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-500">{candidate.position}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <select
                          value={candidate.status}
                          onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                          className={`text-xs font-medium rounded-full px-2 py-1 ${statusStyle.bg} ${statusStyle.text} focus:outline-none`}
                        >
                          {Object.keys(statusConfig).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                         value={candidate.screeningScore ?? ''}
                         onChange={(e) => handleScoreChange(candidate.id, 'screeningScore', e.target.value)}
                         disabled={editingId !== candidate.id}
                         className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
                       >
                         <option value="" disabled>Select</option>
                         {scoreOptions.map(opt => (
                           <option key={opt} value={opt}>{opt}</option>
                         ))}
                       </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={candidate.interviewScore ?? ''}
                          onChange={(e) => handleScoreChange(candidate.id, 'interviewScore', e.target.value)}
                          disabled={editingId !== candidate.id}
                          className="w-20 border border-gray-300 rounded px-2 py-1 mr-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <span className="text-gray-500">/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(candidate.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {editingId === candidate.id ? (
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800 flex items-center space-x-1 transition-colors"
                          >
                            <span>Save</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(candidate.id)}
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
                          >
                            <span>Edit</span>
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setIsViewModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1 transition-colors"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </button>
                        {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical size={16} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding some candidates.'}
            </p>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <ScheduleModal
          selectedIds={selectedIds}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIds([]);
          }}
        />
      )}

      {/* Candidate Details Modal */}
      {isViewModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Candidate Application</h2>
                  <p className="text-sm text-gray-500 mt-1">Application Details</p>
                </div>
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Full Name</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.name}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Email</div>
                        <div className="w-2/3 text-sm text-gray-900 flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-gray-400" />
                          {selectedCandidate.email || 'candidate@example.com'}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Phone</div>
                        <div className="w-2/3 text-sm text-gray-900 flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-gray-400" />
                          {selectedCandidate.phone}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Date of Birth</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.dob}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Address</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.address}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">City</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.city}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">State</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.state}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">ZIP Code</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.zip}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Position</div>
                        <div className="w-2/3 text-sm text-gray-900 flex items-center">
                          <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                          {selectedCandidate.position}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Resume</div>
                        <div className="w-2/3 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          View Resume
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">LinkedIn</div>
                        <a 
                          href={`https://${selectedCandidate.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-2/3 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center"
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          {selectedCandidate.linkedin}
                        </a>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Portfolio</div>
                        <a 
                          href={`https://${selectedCandidate.portfolio}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-2/3 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          {selectedCandidate.portfolio}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Education</div>
                        <div className="w-2/3 text-sm text-gray-900">
                          <div className="flex items-start">
                            <GraduationCap className="mr-2 h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            {selectedCandidate.education}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Experience</div>
                        <div className="w-2/3 text-sm text-gray-900">
                          <div className="flex items-start">
                            <BriefcaseIcon className="mr-2 h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            {selectedCandidate.experience}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Skills</div>
                        <div className="w-2/3">
                          <div className="flex flex-wrap gap-2">
                            {selectedCandidate.skills.map(skill => (
                              <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Certifications</div>
                        <div className="w-2/3 text-sm text-gray-900">
                          <div className="flex items-start">
                            <Award className="mr-2 h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            {selectedCandidate.certifications}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Expected Salary</div>
                        <div className="w-2/3 text-sm text-gray-900 flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-gray-400 flex-shrink-0" />
                          {selectedCandidate.salary}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Notice Period</div>
                        <div className="w-2/3 text-sm text-gray-900 flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-400 flex-shrink-0" />
                          {selectedCandidate.noticePeriod}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Willing to Relocate?</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.relocate}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1/3 text-sm font-medium text-gray-500">Source</div>
                        <div className="w-2/3 text-sm text-gray-900">{selectedCandidate.source}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
                {/* <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Schedule Interview
                  <MoveRight className="ml-2 -mr-1 h-4 w-4" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;