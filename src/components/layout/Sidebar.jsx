import { NavLink, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Question Bank', path: '/questions' },
    { name: 'Company Tracker', path: '/companies' },
    { name: 'Goals', path: '/goals' }
  ];

  return (
    <aside className="w-64 glass-panel border-r border-t-0 border-b-0 border-l-0 h-full hidden md:block shrink-0">
      <nav className="flex flex-col p-4 space-y-2 mt-4">
        {links.map(link => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;