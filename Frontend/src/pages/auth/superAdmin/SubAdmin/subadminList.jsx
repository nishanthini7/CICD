import React, { useState } from 'react';
import { Trash2, CheckCircle } from 'lucide-react';

const SubSuperAdminManager = () => {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const handleInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const sendInvitationEmail = (admin) => {
    console.log(`Sending email to: ${admin.email}`);
    console.log(`Generated password (for backend use only): ${admin.tempPassword}`);
    // You should send this info to backend, and backend should email the user.
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (form.name && form.email) {
      const tempPassword = generateRandomPassword();
      const newAdmin = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        tempPassword,
        status: 'Invitation Sent',
      };
      setAdmins([...admins, newAdmin]);
      sendInvitationEmail(newAdmin);
      setForm({ name: '', email: '' });
    }
  };

  const handleDelete = (id) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sub Super Admin Management</h1>
      
      {/* Invitation Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Invite New Sub Admin</h2>
        <form onSubmit={handleAddAdmin}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="px-4 py-2 border rounded-md focus:ring-indigo-500 focus:outline-none"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="px-4 py-2 border rounded-md focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Send Invitation
          </button>
        </form>
      </div>

      {/* Sub Admins Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-indigo-100 text-indigo-800 font-semibold text-left">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-6 text-center text-gray-400">
                    No Sub Admins Invited Yet
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-3">{admin.name}</td>
                    <td className="px-6 py-3">{admin.email}</td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                        <CheckCircle size={16} className="text-green-600" />
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubSuperAdminManager;