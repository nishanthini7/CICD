import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import Logo from '../../../components/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Check if we're in a dashboard route
  const isDashboardRoute = window.location.pathname.startsWith('/hr/') || 
                         window.location.pathname.startsWith('/company/') ||
                         window.location.pathname.startsWith('/candidate/') ||
                         window.location.pathname.startsWith('/super-admin/');

  if (isDashboardRoute) {
    return (
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} RMS. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Privacy Policy</span>
                <span className="text-sm">Privacy</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Terms</span>
                <span className="text-sm">Terms</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#181ed4] text-white relative z-10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="bg-white p-1 rounded-lg">
                <Logo className="h-12 w-12 object-contain" />
              </div>
              {/* <span className="text-2xl font-bold text-[#181ed4] bg-white px-2 py-1 rounded">RMS</span> */}
            </div>
            <p className="text-white max-w-md mb-1">
              Revolutionizing recruitment with intelligent automation and seamless candidate management. 
              Built by JIT Global Info Systems for the modern workforce.
            </p>
            <div className="flex space-x-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-slate-400 hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/why-rms" className="text-slate-400 hover:text-white transition-colors">
                  Why RMS
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-400 text-sm">
                  2/181, AGS Colony, Phase – 3, 1st floor, 4th Avenue, Mugalivakkam, Chennai - 600125
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+917810099942" className="text-slate-400 hover:text-white transition-colors">
                  +91 78100 99942
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:sales@jitglobalinfosystems.com" className="text-slate-400 hover:text-white transition-colors">
                  sales@jitglobalinfosystems.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="https://jitglobalinfosystems.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  jitglobalinfosystems.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white-500 text-sm">
              &copy; {currentYear} JIT Global Info Systems Pvt Limited. All Rights Reserved.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;