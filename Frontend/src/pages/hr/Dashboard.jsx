import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { Users, Briefcase, CheckCircle, Clock, X, Calendar, Filter, TrendingUp } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc', '#f472b6'];

// Extended to 12 months data
const ALL_APPLICATIONS = [
  { name: 'Jan', date: new Date(2025, 0, 15), applications: 400 },
  { name: 'Feb', date: new Date(2025, 1, 10), applications: 300 },
  { name: 'Mar', date: new Date(2025, 2, 6), applications: 500 },
  { name: 'Apr', date: new Date(2025, 3, 12), applications: 200 },
  { name: 'May', date: new Date(2025, 4, 18), applications: 350 },
  { name: 'Jun', date: new Date(2025, 5, 24), applications: 420 },
  { name: 'Jul', date: new Date(2025, 6, 2), applications: 480 },
  { name: 'Aug', date: new Date(2025, 7, 8), applications: 380 },
  { name: 'Sep', date: new Date(2025, 8, 14), applications: 450 },
  { name: 'Oct', date: new Date(2025, 9, 20), applications: 520 },
  { name: 'Nov', date: new Date(2025, 10, 26), applications: 390 },
  { name: 'Dec', date: new Date(2025, 11, 5), applications: 460 },
];

const ALL_DEPARTMENTS = [
  { name: 'Engineering', value: 300 },
  { name: 'Marketing', value: 100 },
  { name: 'Sales', value: 80 },
  { name: 'Customer Support', value: 70 },
  { name: 'HR', value: 50 },
];

// Application sources with matching totals
const APPLICATION_SOURCES = [
  { name: 'LinkedIn', value: 461, percentage: 30 },
  { name: 'Indeed', value: 384, percentage: 25 },
  { name: 'Company Website', value: 307, percentage: 20 },
  { name: 'Referrals', value: 230, percentage: 15 },
  { name: 'Job Boards', value: 153, percentage: 10 },
];

// Open positions with department details
const OPEN_POSITIONS = [
  { 
    department: 'Engineering', 
    title: 'Frontend Developer', 
    positions: 3, 
    applications: 45,
    roles: ['React Developer', 'Vue.js Developer', 'Angular Developer'],
    priority: 'High'
  },
  { 
    department: 'Design', 
    title: 'UX Designer', 
    positions: 2, 
    applications: 32,
    roles: ['UI/UX Designer', 'Product Designer'],
    priority: 'Medium'
  },
  { 
    department: 'Marketing', 
    title: 'Digital Marketing Manager', 
    positions: 1, 
    applications: 28,
    roles: ['SEO Specialist', 'Content Marketing'],
    priority: 'High'
  },
  { 
    department: 'Sales', 
    title: 'Sales Executive', 
    positions: 4, 
    applications: 38,
    roles: ['Inside Sales', 'Account Executive', 'Sales Manager'],
    priority: 'Medium'
  },
  { 
    department: 'HR', 
    title: 'HR Generalist', 
    positions: 1, 
    applications: 15,
    roles: ['Recruiter', 'HR Assistant'],
    priority: 'Low'
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [showLargeGraph, setShowLargeGraph] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('all');
  const [selectedMonths, setSelectedMonths] = useState(6);

  const setDateRangePreset = (days, presetName) => {
    if (days === null) {
      setDateRange([null, null]);
      setSelectedPreset('all');
      return;
    }
    
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setDateRange([start, end]);
    setSelectedPreset(presetName);
    setShowDatePicker(false);
  };

  const clearDateFilter = () => {
    setDateRange([null, null]);
    setSelectedPreset('all');
  };

  // Filter applications based on chosen date range and month selection
  const filteredApplications = useMemo(() => {
    let result = [...ALL_APPLICATIONS];
    
    // Apply month selection first
    result = result.slice(0, selectedMonths);
    
    if (startDate && endDate) {
      result = result.filter(d => {
        const date = new Date(d.date);
        return date >= startDate && date <= endDate;
      });
    }
    
    return result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [startDate, endDate, selectedMonths]);

  // Calculate totals
  const totalApplicationsFromSources = (APPLICATION_SOURCES || []).reduce((sum, item) => sum + (item?.value || 0), 0);
  const totalDepartmentApplications = (ALL_DEPARTMENTS || []).reduce((sum, dept) => sum + (dept?.value || 0), 0);
  const totalOpenPositions = (OPEN_POSITIONS || []).reduce((sum, pos) => sum + (pos?.positions || 0), 0);

  const getPresetLabel = () => {
    switch (selectedPreset) {
      case 'today': return 'Today';
      case 'week': return 'Last 7 Days';
      case 'month': return 'Last 30 Days';
      case 'quarter': return 'Last 90 Days';
      case 'thisMonth': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'custom': return `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`;
      default: return 'All Time';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Compact Header */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
              <p className="text-sm text-gray-600">Monitor recruitment metrics and analytics</p>
            </div>
            
            {/* Compact Date Filter */}
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>{getPresetLabel()}</span>
                {(startDate || endDate) && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      clearDateFilter();
                    }}
                    className="text-indigo-200 hover:text-white ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </button>

              {showDatePicker && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border p-4 z-50 w-72">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">Filter by Date</h3>
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { key: 'all', label: 'All Time', action: () => setDateRangePreset(null, 'all') },
                      { key: 'today', label: 'Today', action: () => setDateRangePreset(0, 'today') },
                      { key: 'week', label: 'Last 7 Days', action: () => setDateRangePreset(6, 'week') },
                      { key: 'month', label: 'Last 30 Days', action: () => setDateRangePreset(29, 'month') },
                    ].map(preset => (
                      <button
                        key={preset.key}
                        onClick={preset.action}
                        className={`text-left p-2 text-xs rounded transition-colors ${
                          selectedPreset === preset.key
                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compact Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard title="Total Applications" count="1,534" icon={Users} color="blue" />
          <StatCard title="Shortlisted" count="869" icon={CheckCircle} color="green" />
          <StatCard title="Hired" count="236" icon={Briefcase} color="purple" />
          <StatCard title="Pending" count="429" icon={Clock} color="orange" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Applications Over Time */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Applications Over Time</h3>
                <p className="text-sm text-gray-500">{filteredApplications.length} data points</p>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={selectedMonths}
                  onChange={(e) => setSelectedMonths(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value={6}>Last 6 months</option>
                  <option value={12}>All 12 months</option>
                </select>
                <button
                  onClick={() => { setSelectedChart('bar'); setShowLargeGraph(true); }}
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredApplications} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Applications by Department with Center Total */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Applications by Department</h3>
                <p className="text-sm text-gray-500">{totalDepartmentApplications} total applications</p>
              </div>
              <button
                onClick={() => { setSelectedChart('pie'); setShowLargeGraph(true); }}
                className="text-indigo-500 hover:text-indigo-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ALL_DEPARTMENTS}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={45}
                    paddingAngle={2}
                  >
                    {ALL_DEPARTMENTS.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-gray-700">
                    {totalDepartmentApplications}
                  </text>
                  <text x="50%" y="50%" dy={20} textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-500">
                    Total
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {ALL_DEPARTMENTS.map((dept, index) => (
                <div key={dept.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-xs text-gray-600 truncate">{dept.name}</span>
                  <span className="text-xs font-medium text-gray-800">{dept.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Sources Chart */}
        {/* <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Application Sources</h3>
              <p className="text-sm text-gray-500">{totalApplicationsFromSources} total applications</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={APPLICATION_SOURCES} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]}>
                  {APPLICATION_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        {/* Open Positions with Department Details */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Open Positions by Department</h3>
              <p className="text-sm text-gray-500">{totalOpenPositions} total positions • {OPEN_POSITIONS.length} departments</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {OPEN_POSITIONS.map((position, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800 text-sm">{position.department}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(position.priority)}`}>
                      {position.priority}
                    </span>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2 py-1 rounded">
                    {position.positions}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">{position.title}</p>
                <div className="space-y-1 mb-3">
                  {position.roles.slice(0, 2).map((role, roleIndex) => (
                    <div key={roleIndex} className="text-xs text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></div>
                      {role}
                    </div>
                  ))}
                  {position.roles.length > 2 && (
                    <div className="text-xs text-gray-500">+{position.roles.length - 2} more roles</div>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{position.applications} applications</span>
                  <button 
                    onClick={() => navigate('/hr/jdliststatus')}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Enlarged Charts */}
        {showLargeGraph && (
          <Modal onClose={() => setShowLargeGraph(false)}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedChart === 'bar' ? 'Applications Over Time' : 'Applications by Department'}
                </h2>
                <p className="text-gray-600 mt-1">
                  Filtered by: {getPresetLabel()}
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              {selectedChart === 'bar' ? (
                <LineChart 
                  data={filteredApplications}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 14 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 14 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={ALL_DEPARTMENTS}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={3}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {ALL_DEPARTMENTS.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-700">
                    {totalDepartmentApplications}
                  </text>
                  <text x="50%" y="50%" dy={25} textAnchor="middle" dominantBaseline="middle" className="text-lg fill-gray-500">
                    Total
                  </text>
                </PieChart>
              )}
            </ResponsiveContainer>
          </Modal>
        )}
      </div>
    </div>
  );
}

// Compact Components

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

function StatCard({ title, count, icon: Icon, color }) {
  const colorClasses = {
    blue: '#2563eb',
    green: '#16a34a',
    purple: '#9333ea',
    orange: '#ea580c'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${colorClasses[color]}20`, color: colorClasses[color] }}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <h3 className="text-xs font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
}