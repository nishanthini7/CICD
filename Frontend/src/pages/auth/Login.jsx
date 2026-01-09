import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ role: '', email: '', password: '' });
  const [errors, setErrors] = React.useState({ role: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let tempErrors = { role: '', email: '', password: '' };

    if (!form.email) {
      tempErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      tempErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!form.password) {
      tempErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(tempErrors);

    if (valid) {
      // Check for HR login
      if (form.email === 'hr@gmail.com') {
        if (form.password === 'password123') {
          navigate('/hrdashboard');
          return;
        } else {
          setErrors({
            ...tempErrors,
            password: 'Invalid password' 
          });
          return;
        }
      }

      // Check for company admin login (for backward compatibility)
      if (form.email === 'admin@gmail.com' && form.password === 'password123') {
        navigate('/hr-dashboard');
        return;
      }

      // Check for candidate login
      if (form.email === 'candidate@gmail.com' && form.password === 'password123') {
        navigate('/candidate/dashboard');
        return;
      }
      // Check for super admin login
      // if (form.email === 'superadmin@gmail.com' && form.password === 'password123') {
      //   navigate('/super-admin');
      //   return;
      // }


      // If we get here, credentials are invalid
      setErrors({
        ...tempErrors,
        email: form.email.includes('@') ? 'Invalid credentials' : 'Invalid email',
        password: 'Invalid password'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute bottom-0 w-full h-[60%] bg-[#181ed4] rounded-t-[20%] z-0"></div>

      <form className="z-10 w-full max-w-md bg-white shadow-2xl rounded-2xl p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-[#181ed4] mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-left ml-1">Email</label>
          <div className="flex items-start justify-start border border-gray-300 rounded-lg px-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full py-2 outline-none"
            />
          </div>
          {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-left ml-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full py-2 outline-none pr-3" // Adjusted padding-right for consistency
            />
          </div>
          {errors.password && <span className="text-red-500 text-sm ml-1">{errors.password}</span>}
        </div>

        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <Link to="/forgot" className="text-[#181ed4] hover:underline">Forgot password?</Link>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#181ed4] text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Sign in
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account?</span>{' '}
          <Link to="/candidate-register" className="text-[#181ed4] font-medium hover:underline">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;