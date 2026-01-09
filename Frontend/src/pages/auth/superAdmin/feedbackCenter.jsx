import React, { useState } from 'react';
import { MessageSquare, Star, User, Building2, Users, Filter, Search, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react';

const FeedbackCenter = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      userType: 'company_admin',
      userName: 'John Mitchell',
      company: 'Tech Corp',
      rating: 4,
      category: 'Platform Usability',
      subject: 'Dashboard Performance Issues',
      message: 'The dashboard loads slowly during peak hours. Sometimes it takes more than 30 seconds to load the candidate list. This affects our daily operations significantly.',
      status: 'pending',
      priority: 'high',
      timestamp: '2024-07-20 14:30',
      resolved: false
    },
    {
      id: 2,
      userType: 'candidate',
      userName: 'Sarah Johnson',
      company: 'N/A',
      rating: 5,
      category: 'Application Process',
      subject: 'Great Experience',
      message: 'The application process was smooth and user-friendly. I especially liked the auto-save feature and the progress indicator. Keep up the good work!',
      status: 'reviewed',
      priority: 'low',
      timestamp: '2024-07-20 11:15',
      resolved: true
    },
    {
      id: 3,
      userType: 'hr',
      userName: 'Emily Davis',
      company: 'Innovate Solutions',
      rating: 3,
      category: 'Feature Request',
      subject: 'Need Better Filtering Options',
      message: 'We need more advanced filtering options for candidates. Currently, we can only filter by basic criteria, but we need skills-based filtering.',
      status: 'in_progress',
      priority: 'medium',
      timestamp: '2024-07-20 09:45',
      resolved: false
    },
    {
      id: 4,
      userType: 'candidate',
      userName: 'Michael Brown',
      company: 'N/A',
      rating: 2,
      category: 'Technical Issue',
      subject: 'Upload Problems',
      message: 'I had trouble uploading my resume. The file size limit seems too restrictive and the error messages are not clear enough.',
      status: 'pending',
      priority: 'high',
      timestamp: '2024-07-19 16:20',
      resolved: false
    },
    {
      id: 5,
      userType: 'company_admin',
      userName: 'David Wilson',
      company: 'StartUp Inc',
      rating: 4,
      category: 'Integration',
      subject: 'API Documentation Request',
      message: 'The API documentation could be more comprehensive. We need examples for common integration scenarios.',
      status: 'reviewed',
      priority: 'medium',
      timestamp: '2024-07-19 13:10',
      resolved: false
    },
    {
      id: 6,
      userType: 'hr',
      userName: 'Lisa Anderson',
      company: 'Global Corp',
      rating: 5,
      category: 'Feature Request',
      subject: 'Bulk Actions Feature',
      message: 'Love the new bulk actions feature! It has saved us hours of work. Would be great to have bulk messaging as well.',
      status: 'resolved',
      priority: 'low',
      timestamp: '2024-07-19 10:30',
      resolved: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const updateFeedbackStatus = (id, status, resolved = false) => {
    setFeedbacks(prev => 
      prev.map(feedback => 
        feedback.id === id ? { ...feedback, status, resolved } : feedback
      )
    );
  };

  const getUserTypeInfo = (userType) => {
    switch (userType) {
      case 'company_admin':
        return { icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Company Admin' };
      case 'candidate':
        return { icon: User, color: 'text-green-600', bg: 'bg-green-100', label: 'Candidate' };
      case 'hr':
        return { icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', label: 'HR' };
      default:
        return { icon: User, color: 'text-gray-600', bg: 'bg-gray-100', label: 'User' };
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' };
      case 'in_progress':
        return { icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Progress' };
      case 'reviewed':
        return { icon: Eye, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Reviewed' };
      case 'resolved':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Resolved' };
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unknown' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesUserType = filter === 'all' || feedback.userType === filter;
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || feedback.priority === priorityFilter;
    const matchesSearch = searchTerm === '' || 
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesUserType && matchesStatus && matchesPriority && matchesSearch;
  });

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter(f => f.status === 'pending').length,
    resolved: feedbacks.filter(f => f.resolved).length,
    avgRating: (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1),
    byUserType: {
      company_admin: feedbacks.filter(f => f.userType === 'company_admin').length,
      candidate: feedbacks.filter(f => f.userType === 'candidate').length,
      hr: feedbacks.filter(f => f.userType === 'hr').length
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="overflow-y-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Feedback Center</h1>
                <p className="text-gray-600">Manage feedback from all user types</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Average Rating</p>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-semibold text-gray-900">{stats.avgRating}</span>
                  <div className="flex">{renderStars(Math.round(stats.avgRating))}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Total</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600">Pending</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Resolved</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.resolved}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Admins</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.byUserType.company_admin}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Candidates</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.byUserType.candidate}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">HR</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.byUserType.hr}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All User Types</option>
              <option value="company_admin">Company Admins</option>
              <option value="candidate">Candidates</option>
              <option value="hr">HR</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-600">No feedback matches your current filters.</p>
          </div>
        ) : (
          filteredFeedbacks.map(feedback => {
            const userTypeInfo = getUserTypeInfo(feedback.userType);
            const statusInfo = getStatusInfo(feedback.status);
            const UserIcon = userTypeInfo.icon;
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={feedback.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 ${getPriorityColor(feedback.priority)} transition-all hover:shadow-md`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${userTypeInfo.bg}`}>
                        <UserIcon className={`w-5 h-5 ${userTypeInfo.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{feedback.subject}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                          <span className="font-medium">{feedback.userName}</span>
                          <span className="text-gray-400">•</span>
                          <span className={userTypeInfo.color}>{userTypeInfo.label}</span>
                          {feedback.company !== 'N/A' && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span>{feedback.company}</span>
                            </>
                          )}
                          <span className="text-gray-400">•</span>
                          <span>{feedback.category}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center space-x-1">
                            {renderStars(feedback.rating)}
                            <span className="text-sm text-gray-600 ml-1">({feedback.rating}/5)</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{feedback.timestamp}</span>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-4">{feedback.message}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feedback.priority === 'high' ? 'bg-red-100 text-red-800' :
                        feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)} Priority
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {feedback.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'in_progress')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            Start Review
                          </button>
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'resolved', true)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                          >
                            Mark Resolved
                          </button>
                        </>
                      )}
                      
                      {feedback.status === 'in_progress' && (
                        <>
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'reviewed')}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm"
                          >
                            Mark Reviewed
                          </button>
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'resolved', true)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                          >
                            Mark Resolved
                          </button>
                        </>
                      )}
                      
                      {feedback.status === 'reviewed' && !feedback.resolved && (
                        <button
                          onClick={() => updateFeedbackStatus(feedback.id, 'resolved', true)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCenter;