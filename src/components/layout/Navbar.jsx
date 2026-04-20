import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="glass-panel px-6 py-4 flex justify-between items-center z-10 sticky top-0 border-b-white/10">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tighter">
          DSAPrep
        </span>
      </div>
      {currentUser && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400 hidden md:block font-medium">{currentUser.email}</span>
          <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=1e1b4b&color=fff`} alt="Avatar" className="w-8 h-8 rounded-full ring-2 ring-white/10" />
          <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;