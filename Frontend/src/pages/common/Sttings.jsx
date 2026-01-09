import React, { useState } from 'react';
import { 
  Shield, 
  Lock,
  LogOut,
  UserX,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Eye,
  EyeOff,
  Send,
  Star
} from 'lucide-react';

const SettingsScreen = () => {
  const [activeSection, setActiveSection] = useState('privacy');
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [feedback, setFeedback] = useState({ rating: 0, message: '' });

  const settingsSections = [
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'reset-password', label: 'Reset Password', icon: Lock },
    // { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'support', label: 'Support Center', icon: HelpCircle },
    // { id: 'account', label: 'Account Actions', icon: UserX }
  ];

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          {Object.entries({
            profileVisible: { label: 'Profile Visibility', desc: 'Make your profile visible to other users' },
            showEmail: { label: 'Show Email Address', desc: 'Display email on your public profile' }
          }).map(([key, { label, desc }]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy[key] ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-gray-400 text-white rounded-lg  transition-colors">
              Enabled
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Login Sessions</p>
              <p className="text-sm text-gray-600">Manage your active login sessions</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ... rest of the component code remains the same ...
  const renderResetPassword = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Password</h3>
        <p className="text-gray-600 mb-6">Update your password to keep your account secure</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Password Requirements:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Include at least one uppercase letter</li>
              <li>• Include at least one lowercase letter</li>
              <li>• Include at least one number</li>
              <li>• Include at least one special character</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Feedback</h3>
        <p className="text-gray-600 mb-6">Help us improve by sharing your thoughts and suggestions</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Rate your experience</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                  className={`p-1 transition-colors ${
                    star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your feedback</label>
            <textarea
              rows={5}
              value={feedback.message}
              onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Tell us about your experience, suggestions for improvement, or report any issues..."
            />
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Send className="w-4 h-4" />
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Center</h3>
        <p className="text-gray-600 mb-6">Get help and find answers to common questions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">📚 Knowledge Base</h4>
            <p className="text-sm text-gray-600">Browse articles and tutorials</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">📧 Email Support</h4>
            <p className="text-sm text-gray-600">Send us a detailed message</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Email: sales@jitglobalinfosystems.com</p>
            <p>Phone: +91 78100 99942</p>
            <p>Hours: Monday - Friday, 10 AM - 7 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <LogOut className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Log Out</h4>
                  <p className="text-sm text-gray-600">Sign out from your account</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Log Out
              </button>
            </div>
          </div>

          {/* <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <UserX className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Deactivate Account</h4>
                  <p className="text-sm text-gray-600">Temporarily disable your account</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                Deactivate
              </button>
            </div>
            <p className="text-xs text-yellow-700 mt-2">
              Your account will be hidden but can be reactivated at any time by logging back in.
            </p>
          </div> */}

          {/* <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <UserX className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Delete Account</h4>
                  <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
            <p className="text-xs text-red-700 mt-2">
              ⚠ This action cannot be undone. All your data will be permanently removed.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'privacy':
        return renderPrivacy();
      case 'reset-password':
        return renderResetPassword();
      case 'feedback':
        return renderFeedback();
      case 'support':
        return renderSupport();
      case 'account':
        return renderAccount();
      default:
        return renderPrivacy();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;