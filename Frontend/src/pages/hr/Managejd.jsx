import React, { useState } from 'react';
import { Plus, Eye, FileText, Users, X, PlusCircle, Trash2 } from 'lucide-react';

const HrManageJDs = () => {
  const [jdList, setJdList] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      date: '2025-07-25',
      primarySkills: 'React, JavaScript, CSS',
      secondarySkills: 'TypeScript, Redux',
      mustHaveSkills: 'React, JS',
      yearsOfExp: '3',
      applications: 42,
      status: 'Open',
      latestInvitedEmail: null,
    },
    {
      id: 2,
      title: 'Backend Developer',
      date: '2025-07-26',
      primarySkills: 'Node.js, Express, MongoDB',
      secondarySkills: 'Docker, Kubernetes',
      mustHaveSkills: 'Node.js, MongoDB',
      yearsOfExp: '4',
      applications: 19,
      status: 'In Progress',
      latestInvitedEmail: null,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newJD, setNewJD] = useState({
    title: '',
    primarySkills: '',
    secondarySkills: '',
    mustHaveSkills: '',
    yearsOfExp: '',
    status: 'Open',
    customFields: {}
  });
  
  const [customFieldTitle, setCustomFieldTitle] = useState('');
  const [showCustomFieldInput, setShowCustomFieldInput] = useState(false);
  
  const addCustomField = () => {
    if (customFieldTitle.trim()) {
      setNewJD(prev => ({
        ...prev,
        customFields: {
          ...prev.customFields,
          [customFieldTitle]: ''
        }
      }));
      setCustomFieldTitle('');
      setShowCustomFieldInput(false);
    }
  };
  
  const removeCustomField = (fieldName) => {
    const newCustomFields = { ...newJD.customFields };
    delete newCustomFields[fieldName];
    setNewJD(prev => ({
      ...prev,
      customFields: newCustomFields
    }));
  };
  
  const handleCustomFieldChange = (fieldName, value) => {
    setNewJD(prev => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [fieldName]: value
      }
    }));
  };
  const [isUploading, setIsUploading] = useState(false);

  // Invite Candidate State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedJdForInvite, setSelectedJdForInvite] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePassword, setInvitePassword] = useState('');
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  // View JD Modal State
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJdForView, setSelectedJdForView] = useState(null);

  const handleSubmit = () => {
    // Require title, primarySkills, mustHaveSkills, and yearsOfExp to submit
    if (
      newJD.title &&
      newJD.primarySkills &&
      newJD.mustHaveSkills &&
      newJD.yearsOfExp
    ) {
      setIsUploading(true);
      setTimeout(() => {
        const newEntry = {
          id: jdList.length + 1,
          title: newJD.title,
          primarySkills: newJD.primarySkills,
          secondarySkills: newJD.secondarySkills,
          mustHaveSkills: newJD.mustHaveSkills,
          yearsOfExp: newJD.yearsOfExp,
          customFields: { ...newJD.customFields },
          date: new Date().toISOString().split('T')[0],
          applications: 0,
          status: newJD.status,
          latestInvitedEmail: null,
        };
        setJdList([newEntry, ...jdList]);
        setShowModal(false);
        setNewJD({
          title: '',
          primarySkills: '',
          secondarySkills: '',
          mustHaveSkills: '',
          yearsOfExp: '',
          status: 'Open',
          customFields: {},
        });
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setJdList(
      jdList.map((jd) => (jd.id === id ? { ...jd, status: newStatus } : jd))
    );
  };

  // Invite Candidate Modal Logic
  const openInviteModal = (jd) => {
    setSelectedJdForInvite(jd);
    setShowInviteModal(true);
    setInviteEmail('');
    setInvitePassword('');
    setInviteSent(false);
  };

  const closeInviteModal = () => {
    setShowInviteModal(false);
    setSelectedJdForInvite(null);
    setInviteEmail('');
    setInvitePassword('');
    setInviteSent(false);
  };

  const handleInviteSend = () => {
    if (!inviteEmail || !invitePassword) return;
    setIsSendingInvite(true);
    setTimeout(() => {
      setInviteSent(true);
      setIsSendingInvite(false);

      // Update latestInvitedEmail for this JD
      setJdList(
        jdList.map((jd) =>
          jd.id === selectedJdForInvite.id ? { ...jd, latestInvitedEmail: inviteEmail } : jd
        )
      );
    }, 1200);
  };

  // View JD Modal Logic
  const openViewModal = (jd) => {
    setSelectedJdForView(jd);
    setShowViewModal(true);
  };
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedJdForView(null);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Closed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div
      className="p-6 bg-gray-100 min-h-screen bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22%3E%3Cpath fill=%22%23e5e7eb%22 d=%22M0 0h80v80H0z%22/%3E%3Cpath fill=%22%23f3f4f6%22 d=%22M40 0h40v40H40zM0 40h40v40H0z%22/%3E%3C/svg%3E')]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
          Job Description Hub
        </h2>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} /> New JD
        </button>
      </div>

      {/* JD Summary Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl p-6 rounded-2xl w-fit mb-8 transform transition-all hover:shadow-2xl">
        <h3 className="text-sm font-medium text-gray-600">Total Job Descriptions</h3>
        <p className="text-4xl font-bold text-indigo-600">{jdList.length}</p>
      </div>

      {/* JD Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {jdList.map((jd) => (
          <div
            key={jd.id}
            className="bg-white rounded-xl shadow-md p-3 border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2">
                <FileText className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="space-y-0.5">
                  <h4 className="text-base font-semibold text-gray-800 leading-tight line-clamp-1">
                    {jd.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] text-gray-500">
                    <span className="truncate" title={jd.primarySkills}>
                      <span className="font-medium">Primary:</span> {jd.primarySkills}
                    </span>
                    <span className="truncate" title={jd.mustHaveSkills}>
                      <span className="font-medium">Must Have:</span> {jd.mustHaveSkills}
                    </span>
                    <span className="truncate" title={jd.secondarySkills}>
                      <span className="font-medium">Secondary:</span> {jd.secondarySkills}
                    </span>
                    <span>
                      <span className="font-medium">Exp:</span> {jd.yearsOfExp} yrs
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Uploaded: {jd.date}</p>
                </div>
              </div>
              <select
                className={`text-xs font-semibold rounded-full px-3 py-1 border ${getStatusStyles(
                  jd.status
                )} focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200`}
                value={jd.status}
                onChange={(e) => handleStatusChange(jd.id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center justify-between mt-2 mb-2">
              <div className="flex items-center gap-1.5 bg-indigo-50 rounded-full px-2.5 py-1">
                <Users className="text-indigo-600" size={12} />
                <span className="text-xs font-medium text-indigo-700">{jd.applications} Applications</span>
              </div>
              <button
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-xs font-medium transition-colors duration-200 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-full"
                onClick={() => openViewModal(jd)}
              >
                <Eye size={12} className="-ml-0.5" /> View
              </button>
            </div>

            {/* Invite Candidate Button */}
            <button
              onClick={() => openInviteModal(jd)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center gap-1.5 text-xs font-medium mb-2"
            >
              Invite Candidate
            </button>

            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((jd.applications / 50) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5 text-right">{Math.round(Math.min((jd.applications / 50) * 100, 100))}% filled</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload JD Modal - Compact Version */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl w-full max-w-sm shadow-2xl transition-all scale-100 animate-in">
            <h3 className="text-base font-bold text-gray-800 mb-3">Create New Job Description</h3>
            <div className="grid grid-cols-2 gap-2 mb-1.5">
              <div className="col-span-2">
                <label className="block text-sm text-gray-700 mb-1">JD Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 bg-gray-50"
                  value={newJD.title}
                  onChange={e => setNewJD({ ...newJD, title: e.target.value })}
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Primary Skills</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 bg-gray-50"
                  value={newJD.primarySkills}
                  onChange={e => setNewJD({ ...newJD, primarySkills: e.target.value })}
                  placeholder="E.g. React"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Secondary Skills</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 bg-gray-50"
                  value={newJD.secondarySkills}
                  onChange={e => setNewJD({ ...newJD, secondarySkills: e.target.value })}
                  placeholder="E.g. Redux"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Must-Have Skills</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 bg-gray-50"
                  value={newJD.mustHaveSkills}
                  onChange={e => setNewJD({ ...newJD, mustHaveSkills: e.target.value })}
                  placeholder="Must-Have"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Years of Exp.</label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 bg-gray-50"
                  value={newJD.yearsOfExp}
                  onChange={e => setNewJD({ ...newJD, yearsOfExp: e.target.value })}
                  placeholder="3"
                />
              </div>
            </div>
            {/* Compact Additional Fields Section */}
            <div className="mt-1 border-t border-gray-100 pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Additional Fields</span>
                {!showCustomFieldInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomFieldInput(true)}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    <PlusCircle size={14} /> Add
                  </button>
                ) : (
                  <div className="flex gap-1 items-center">
                    <input
                      type="text"
                      value={customFieldTitle}
                      onChange={e => setCustomFieldTitle(e.target.value)}
                      placeholder="Field title"
                      className="text-sm border rounded px-3 py-2 w-28 focus:ring-1 focus:ring-indigo-500"
                      autoFocus
                    />
                    <button
                      onClick={addCustomField}
                      className="text-sm bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100"
                      disabled={!customFieldTitle.trim()}
                    >Add</button>
                    <button
                      onClick={() => {
                        setShowCustomFieldInput(false);
                        setCustomFieldTitle('');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
              {Object.entries(newJD.customFields).map(([fieldName, value]) => (
                <div key={fieldName} className="mb-2 flex flex-col group relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm text-gray-600">{fieldName}</label>
                    <button
                      type="button"
                      onClick={() => removeCustomField(fieldName)}
                      className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    ><Trash2 size={12} /></button>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 bg-gray-50"
                    value={value}
                    onChange={e => handleCustomFieldChange(fieldName, e.target.value)}
                    placeholder={`Enter ${fieldName.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
                disabled={isUploading}
              >Cancel</button>
              <button
                className={`px-5 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-1
                  ${isUploading ||
                    !newJD.title ||
                    !newJD.primarySkills ||
                    !newJD.mustHaveSkills ||
                    !newJD.yearsOfExp
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                  }`}
                onClick={handleSubmit}
                disabled={isUploading ||
                  !newJD.title ||
                  !newJD.primarySkills ||
                  !newJD.mustHaveSkills ||
                  !newJD.yearsOfExp
                }
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>Creating...
                  </>
                ) : ('Create')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Candidate Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100 animate-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Invite Candidate for: {selectedJdForInvite?.title}
              </h3>
              <button
                onClick={closeInviteModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {!inviteSent ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Candidate Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter candidate email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    value={invitePassword}
                    onChange={(e) => setInvitePassword(e.target.value)}
                    placeholder="Enter temporary password"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    onClick={closeInviteModal}
                    disabled={isSendingInvite}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:from-green-700 hover:to-emerald-600 flex items-center gap-2 ${
                      isSendingInvite || !inviteEmail || !invitePassword ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleInviteSend}
                    disabled={isSendingInvite || !inviteEmail || !invitePassword}
                  >
                    {isSendingInvite ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Invite"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="bg-emerald-100 rounded-full p-4 mb-5">
                  <svg className="h-10 w-10 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                </div>
                <div className="text-xl font-semibold text-green-700 mb-2">Sent Successfully!</div>
                <div className="text-gray-700 text-sm mb-6 text-center">
                  An invite has been sent to <span className="font-medium">{inviteEmail}</span>.
                </div>
                <button
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600"
                  onClick={closeInviteModal}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Candidate Modal */}
      {showViewModal && selectedJdForView && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl transform transition-all scale-100 animate-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Invite for: {selectedJdForView.title}</h3>
              <button
                onClick={closeViewModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div>
              {selectedJdForView.latestInvitedEmail ? (
                <div className="bg-blue-50 p-5 rounded-xl flex flex-col items-center">
                  <div className="font-semibold text-lg text-blue-700 mb-3">Sent to:</div>
                  <div className="text-md text-gray-800 mb-1">{selectedJdForView.latestInvitedEmail}</div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-10">No candidate invite has been sent for this JD yet.</div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600"
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrManageJDs;
