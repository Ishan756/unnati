import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, User, MapPin, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const navVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, duration: 0.6, type: 'spring' }},
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useUser();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/internships', icon: Briefcase, label: 'Internships' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-gray-900 to-gray-800 text-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.header
        className="bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-700"
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.04 }}>
              <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-400 rounded-lg flex items-center justify-center shadow-xl">
                <Award className="h-5 w-5 text-gray-900 animate-bounce" />
              </div>
              <motion.h1
                className="text-xl font-extrabold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}>
                UNNATI
              </motion.h1>
            </motion.div>
            <motion.div className="flex items-center space-x-2 text-sm text-gray-300"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <MapPin className="h-4 w-4" />
              <span>Local Opportunities</span>
            </motion.div>
            <motion.button
              onClick={handleLogout}
              className="ml-6 px-4 py-2 bg-white text-gray-900 rounded font-semibold shadow hover:bg-gray-300 transition"
              whileHover={{ scale: 1.08, boxShadow: '0 0 4px #ffffffAA' }}>
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>
      <motion.main className="flex-1 pb-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {children}
      </motion.main>
      <motion.nav
        className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-700 px-4 py-2 z-50"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-around">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <motion.div key={path}
                whileHover={{ scale: 1.08, boxShadow: '0 0 6px #ffffff88' }}
                transition={{ type: 'spring', stiffness: 350, damping: 14 }}>
                <Link
                  to={path}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-white bg-gray-800 shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <motion.span
                    className="text-xs font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.14 }}
                  >
                    {label}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Layout;
