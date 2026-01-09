import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Users,
  Building2,
  UserCheck,
  MessageCircle,
  BarChart3,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  TrendingUp,
  Heart
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
//test
const SuperAdminHome = () => {
  const [filter, setFilter] = useState("Monthly");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [zoomedChart, setZoomedChart] = useState(null);
  const datePickerButtonRef = useRef(null);
  const chartCardRef = useRef(null);

  const userCounts = [
    { label: "Companies", count: 18, icon: Building2, color: "bg-blue-50", iconColor: "text-blue-600", bgGradient: "from-blue-500 to-blue-600" },
    { label: "Recruiters", count: 45, icon: UserCheck, color: "bg-green-50", iconColor: "text-green-600", bgGradient: "from-green-500 to-green-600" },
    { label: "Candidates", count: 230, icon: Users, color: "bg-purple-50", iconColor: "text-purple-600", bgGradient: "from-purple-500 to-purple-600" },
    { label: "Happy Customers", count: 156, icon: Heart, color: "bg-pink-50", iconColor: "text-pink-600", bgGradient: "from-pink-500 to-pink-600" },
    { label: "Feedback (Last Week)", count: 18, icon: MessageCircle, color: "bg-orange-50", iconColor: "text-orange-600", bgGradient: "from-orange-500 to-orange-600" },
  ];

  // Generate weekly data based on selected week
  const getWeeklyData = (baseDate) => {
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    return [
      { name: "Mon", users: Math.floor(Math.random() * 30) + 15 },
      { name: "Tue", users: Math.floor(Math.random() * 40) + 20 },
      { name: "Wed", users: Math.floor(Math.random() * 35) + 18 },
      { name: "Thu", users: Math.floor(Math.random() * 45) + 25 },
      { name: "Fri", users: Math.floor(Math.random() * 35) + 20 },
      { name: "Sat", users: Math.floor(Math.random() * 25) + 10 },
      { name: "Sun", users: Math.floor(Math.random() * 30) + 15 },
    ];
  };

  const userTrendData = useMemo(() => getWeeklyData(selectedWeek), [selectedWeek]);

  const allMemberData = {
    Monthly: [
      { name: "Jul", date: new Date(2024, 6, 1), Jobseekers: 130, Recruiters: 10 },
      { name: "Aug", date: new Date(2024, 7, 1), Jobseekers: 125, Recruiters: 12 },
      { name: "Sep", date: new Date(2024, 8, 1), Jobseekers: 120, Recruiters: 15 },
      { name: "Oct", date: new Date(2024, 9, 1), Jobseekers: 370, Recruiters: 12 },
      { name: "Nov", date: new Date(2024, 10, 1), Jobseekers: 720, Recruiters: 11 },
      { name: "Dec", date: new Date(2024, 11, 1), Jobseekers: 70, Recruiters: 18 },
      { name: "Jan", date: new Date(2025, 0, 1), Jobseekers: 60, Recruiters: 10 },
      { name: "Feb", date: new Date(2025, 1, 1), Jobseekers: 260, Recruiters: 9 },
      { name: "Mar", date: new Date(2025, 2, 1), Jobseekers: 60, Recruiters: 12 },
      { name: "Apr", date: new Date(2025, 3, 1), Jobseekers: 230, Recruiters: 13 },
      { name: "May", date: new Date(2025, 4, 1), Jobseekers: 20, Recruiters: 14 },
      { name: "Jun", date: new Date(2025, 5, 1), Jobseekers: 10, Recruiters: 11 },
    ],
    Weekly: [
      { name: "Week 1", date: new Date(2025, 6, 1), Jobseekers: 80, Recruiters: 4 },
      { name: "Week 2", date: new Date(2025, 6, 8), Jobseekers: 120, Recruiters: 6 },
      { name: "Week 3", date: new Date(2025, 6, 15), Jobseekers: 70, Recruiters: 5 },
      { name: "Week 4", date: new Date(2025, 6, 22), Jobseekers: 100, Recruiters: 7 },
    ],
    Daily: [
      { name: "Mon", date: new Date(2025, 6, 21), Jobseekers: 20, Recruiters: 1 },
      { name: "Tue", date: new Date(2025, 6, 22), Jobseekers: 18, Recruiters: 2 },
      { name: "Wed", date: new Date(2025, 6, 23), Jobseekers: 24, Recruiters: 1 },
      { name: "Thu", date: new Date(2025, 6, 24), Jobseekers: 30, Recruiters: 3 },
      { name: "Fri", date: new Date(2025, 6, 25), Jobseekers: 28, Recruiters: 2 },
      { name: "Sat", date: new Date(2025, 6, 26), Jobseekers: 10, Recruiters: 1 },
      { name: "Sun", date: new Date(2025, 6, 27), Jobseekers: 12, Recruiters: 1 },
    ],
  };

  // Filter member data based on date range
  const memberData = useMemo(() => {
    const [startDate, endDate] = dateRange;
    const baseData = allMemberData[filter];
    
    if (!startDate || !endDate) {
      return baseData;
    }
    
    return baseData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }, [filter, dateRange]);

  const recentData = {
    candidates: [
      { name: "John Doe", email: "john@example.com", joined: "2025-07-22" },
      { name: "Jane Smith", email: "jane@example.com", joined: "2025-07-23" },
      { name: "Alex Johnson", email: "alex@example.com", joined: "2025-07-24" },
      { name: "Sarah Wilson", email: "sarah@example.com", joined: "2025-07-25" },
      { name: "Michael Brown", email: "michael@example.com", joined: "2025-07-26" },
      { name: "Emily Davis", email: "emily@example.com", joined: "2025-07-27" },
      { name: "David Wilson", email: "david@example.com", joined: "2025-07-28" },
      { name: "Lisa Anderson", email: "lisa@example.com", joined: "2025-07-29" },
      { name: "Robert Taylor", email: "robert@example.com", joined: "2025-07-30" },
      { name: "Amanda Garcia", email: "amanda@example.com", joined: "2025-07-31" },
    ],
    recruiters: [
      { name: "Mike Johnson", email: "mike@example.com", joined: "2025-07-21" },
      { name: "Emily Davis", email: "emily@example.com", joined: "2025-07-23" },
      { name: "Robert Brown", email: "robert@example.com", joined: "2025-07-24" },
      { name: "Lisa Garcia", email: "lisa@example.com", joined: "2025-07-25" },
      { name: "James Wilson", email: "james@example.com", joined: "2025-07-26" },
      { name: "Jennifer Lee", email: "jennifer@example.com", joined: "2025-07-27" },
      { name: "Thomas Anderson", email: "thomas@example.com", joined: "2025-07-28" },
      { name: "Maria Rodriguez", email: "maria@example.com", joined: "2025-07-29" },
      { name: "Christopher Martinez", email: "chris@example.com", joined: "2025-07-30" },
      { name: "Jessica Thompson", email: "jessica@example.com", joined: "2025-07-31" },
    ],
    jobs: [
      { title: "Frontend Developer", company: "TechSoft", posted: "2025-07-22" },
      { title: "Data Analyst", company: "FinCorp", posted: "2025-07-23" },
      { title: "UX Designer", company: "Creative Inc", posted: "2025-07-24" },
      { title: "Backend Engineer", company: "DevCorp", posted: "2025-07-25" },
      { title: "Product Manager", company: "InnovateTech", posted: "2025-07-26" },
      { title: "DevOps Engineer", company: "CloudSys", posted: "2025-07-27" },
      { title: "Mobile Developer", company: "AppWorks", posted: "2025-07-28" },
      { title: "QA Engineer", company: "TestPro", posted: "2025-07-29" },
      { title: "UI Designer", company: "DesignHub", posted: "2025-07-30" },
      { title: "System Architect", company: "ArchTech", posted: "2025-07-31" },
    ],
    feedbacks: [
      { name: "Rahul", message: "Great platform!", date: "2025-07-23" },
      { name: "Anjali", message: "Easy to navigate.", date: "2025-07-24" },
      { name: "Priya", message: "Excellent features!", date: "2025-07-25" },
      { name: "Vikram", message: "Very user-friendly!", date: "2025-07-26" },
      { name: "Sneha", message: "Amazing experience!", date: "2025-07-27" },
      { name: "Arjun", message: "Highly recommended!", date: "2025-07-28" },
      { name: "Meera", message: "Outstanding service!", date: "2025-07-29" },
      { name: "Karthik", message: "Best platform ever!", date: "2025-07-30" },
      { name: "Divya", message: "Love the interface!", date: "2025-07-31" },
      { name: "Rohan", message: "Fantastic features!", date: "2025-08-01" },
    ],
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedWeek(newDate);
  };

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const getDateRangeLabel = () => {
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate) {
      return 'All Time';
    }
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const setDateRangePreset = (days) => {
    if (days === null) {
      setDateRange([null, null]);
      return;
    }
    
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setDateRange([start, end]);
    setShowDatePicker(false);
  };

  const clearDateFilter = () => {
    setDateRange([null, null]);
  };

  // Close date picker on scroll and click outside
  useEffect(() => {
    const handleScroll = () => {
      if (showDatePicker) {
        console.log('Scroll detected, closing date picker');
        setShowDatePicker(false);
      }
    };

    const handleClickOutside = (event) => {
      if (showDatePicker && datePickerButtonRef.current && !datePickerButtonRef.current.contains(event.target)) {
        const dropdown = document.querySelector('[data-date-picker-dropdown]');
        if (!dropdown || !dropdown.contains(event.target)) {
          setShowDatePicker(false);
        }
      }
    };

    // Add multiple listeners for comprehensive scroll detection
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('wheel', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('wheel', handleScroll, { passive: true });
    document.documentElement.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.addEventListener('wheel', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('wheel', handleScroll);
      document.documentElement.removeEventListener('scroll', handleScroll);
      document.documentElement.removeEventListener('wheel', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  // Close zoomed chart on scroll and click outside
  useEffect(() => {
    const handleScroll = () => {
      if (zoomedChart) {
        console.log('Scroll detected, closing zoomed chart');
        setZoomedChart(null);
      }
    };

    const handleClickOutside = (event) => {
      if (zoomedChart && chartCardRef.current && !chartCardRef.current.contains(event.target)) {
        setZoomedChart(null);
      }
    };

    // Add multiple listeners for comprehensive scroll detection
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('wheel', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('wheel', handleScroll, { passive: true });
    document.documentElement.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.addEventListener('wheel', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('wheel', handleScroll);
      document.documentElement.removeEventListener('scroll', handleScroll);
      document.documentElement.removeEventListener('wheel', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [zoomedChart]);

  const renderTable = (title, headers, rows) => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{rows.length} entries</span>
      </div>
      <div className="overflow-hidden">
        <div className="overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-left text-gray-600 font-medium">
                {headers.map((h, idx) => (
                  <th key={idx} className="py-3 px-4 rounded-l-lg first:rounded-l-lg last:rounded-r-lg">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {Object.values(row).map((val, idy) => (
                    <td key={idy} className="py-3 px-4 text-gray-700">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderChart = (chartType, data, title, subtitle, customContent) => (
    <div 
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative"
      onClick={() => setZoomedChart(chartType)}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            {title}
          </h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2">
          {customContent}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 p-2 rounded-lg">
            <Maximize2 className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        {chartType === 'weekly' ? (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="url(#weeklyGradient)" 
              strokeWidth={3}
              dot={{ r: 6, fill: '#6366f1' }}
              activeDot={{ r: 8, fill: '#4f46e5' }}
            />
            <defs>
              <linearGradient id="weeklyGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </LineChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Jobseekers" 
              stroke="#6366f1" 
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line 
              type="monotone" 
              dataKey="Recruiters" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        
                 {/* Header */}
         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
           <div className="flex items-center justify-between">
             <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
               <p className="text-gray-600">Monitor platform performance and user activities</p>
             </div>
             <div className="text-right">
               <p className="text-sm text-gray-500">Total Users</p>
               <p className="text-2xl font-bold text-gray-900">293</p>
             </div>
           </div>
         </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {userCounts.map(({ label, count, icon: Icon, color, iconColor, bgGradient }) => (
            <div key={label} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${bgGradient} text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-right flex-1 ml-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                  <p className="text-3xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {renderChart(
            'weekly',
            userTrendData,
            'Weekly User Trend',
            `${getWeekRange(selectedWeek)}`,
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateWeek(-1);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Previous Week"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Week</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateWeek(1);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Next Week"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}

          {renderChart(
            'members',
            memberData,
            'Members Overview',
            `${filter} breakdown - ${getDateRangeLabel()}`,
            <div className="flex items-center space-x-2">
                             <div className="relative">
                 <button
                   ref={datePickerButtonRef}
                   onClick={(e) => {
                     e.stopPropagation();
                     setShowDatePicker(!showDatePicker);
                   }}
                   className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                   title="Select Date Range"
                 >
                  <Calendar className="w-4 h-4" />
                  <span>{getDateRangeLabel()}</span>
                  {(dateRange[0] || dateRange[1]) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearDateFilter();
                      }}
                      className="text-gray-400 hover:text-red-500 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>

                {showDatePicker && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 w-80" data-date-picker-dropdown>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Filter by Date</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDatePicker(false);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {[
                        { label: 'All Time', action: () => setDateRangePreset(null) },
                        { label: 'Today', action: () => setDateRangePreset(0) },
                        { label: 'Last 7 Days', action: () => setDateRangePreset(6) },
                        { label: 'Last 30 Days', action: () => setDateRangePreset(29) },
                        { label: 'Last 90 Days', action: () => setDateRangePreset(89) },
                        { 
                          label: 'This Month', 
                          action: () => {
                            const start = new Date();
                            start.setDate(1);
                            setDateRange([start, new Date()]);
                            setShowDatePicker(false);
                          }
                        }
                      ].map(preset => (
                        <button
                          key={preset.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            preset.action();
                          }}
                          className="text-left p-3 text-sm rounded-lg transition-all duration-200 hover:bg-gray-50 text-gray-700 border-2 border-transparent hover:border-gray-200"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Custom Range</label>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                          <input
                            type="date"
                            value={dateRange[0] ? dateRange[0].toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              e.stopPropagation();
                              const newStart = e.target.value ? new Date(e.target.value) : null;
                              setDateRange([newStart, dateRange[1]]);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">End Date</label>
                          <input
                            type="date"
                            value={dateRange[1] ? dateRange[1].toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              e.stopPropagation();
                              const newEnd = e.target.value ? new Date(e.target.value) : null;
                              setDateRange([dateRange[0], newEnd]);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <select
                value={filter}
                onChange={(e) => {
                  e.stopPropagation();
                  setFilter(e.target.value);
                }}
                className="border border-gray-300 text-sm rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>
          )}
        </div>

        {/* Recent Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderTable("Recent Candidates", ["Name", "Email", "Joined"], recentData.candidates)}
          {renderTable("Recent Recruiters", ["Name", "Email", "Joined"], recentData.recruiters)}
          {renderTable("Recent Job Openings", ["Title", "Company", "Posted"], recentData.jobs)}
          {renderTable("Recent Feedbacks", ["Name", "Message", "Date"], recentData.feedbacks)}
        </div>

                 {/* Zoomed Chart Modal */}
         {zoomedChart && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" ref={chartCardRef}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-8 relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {zoomedChart === 'weekly' ? 'Weekly User Trend - Detailed View' : 'Members Overview - Detailed View'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {zoomedChart === 'weekly' 
                      ? `Data for ${getWeekRange(selectedWeek)}` 
                      : `${filter} breakdown - ${getDateRangeLabel()}`
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {zoomedChart === 'weekly' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigateWeek(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        <span>{getWeekRange(selectedWeek)}</span>
                      </div>
                      <button
                        onClick={() => navigateWeek(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                  {zoomedChart === 'members' && (
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <button
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{getDateRangeLabel()}</span>
                          {(dateRange[0] || dateRange[1]) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                clearDateFilter();
                              }}
                              className="text-gray-400 hover:text-red-500 ml-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </button>

                        {showDatePicker && (
                          <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 w-80" data-date-picker-dropdown>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-gray-900">Filter by Date</h3>
                              <button
                                onClick={() => setShowDatePicker(false)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-6">
                              {[
                                { label: 'All Time', action: () => setDateRangePreset(null) },
                                { label: 'Today', action: () => setDateRangePreset(0) },
                                { label: 'Last 7 Days', action: () => setDateRangePreset(6) },
                                { label: 'Last 30 Days', action: () => setDateRangePreset(29) },
                                { label: 'Last 90 Days', action: () => setDateRangePreset(89) },
                                { 
                                  label: 'This Month', 
                                  action: () => {
                                    const start = new Date();
                                    start.setDate(1);
                                    setDateRange([start, new Date()]);
                                    setShowDatePicker(false);
                                  }
                                }
                              ].map(preset => (
                                <button
                                  key={preset.label}
                                  onClick={preset.action}
                                  className="text-left p-3 text-sm rounded-lg transition-all duration-200 hover:bg-gray-50 text-gray-700 border-2 border-transparent hover:border-gray-200"
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">Custom Range</label>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                                  <input
                                    type="date"
                                    value={dateRange[0] ? dateRange[0].toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                      const newStart = e.target.value ? new Date(e.target.value) : null;
                                      setDateRange([newStart, dateRange[1]]);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">End Date</label>
                                  <input
                                    type="date"
                                    value={dateRange[1] ? dateRange[1].toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                      const newEnd = e.target.value ? new Date(e.target.value) : null;
                                      setDateRange([dateRange[0], newEnd]);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border border-gray-300 text-sm rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                      </select>
                    </div>
                  )}
                  <button
                    onClick={() => setZoomedChart(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={500}>
                {zoomedChart === 'weekly' ? (
                  <LineChart data={userTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="url(#zoomedWeeklyGradient)" 
                      strokeWidth={4}
                      dot={{ r: 8, fill: '#6366f1' }}
                      activeDot={{ r: 10, fill: '#4f46e5' }}
                    />
                    <defs>
                      <linearGradient id="zoomedWeeklyGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                ) : (
                  <LineChart data={memberData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Jobseekers" 
                      stroke="#6366f1" 
                      strokeWidth={4}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Recruiters" 
                      stroke="#10b981" 
                      strokeWidth={4}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminHome;