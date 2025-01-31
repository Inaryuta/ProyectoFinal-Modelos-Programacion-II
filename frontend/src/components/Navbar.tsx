import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors">
            Football Analysis
          </Link>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-lg font-medium hover:text-blue-100 transition-colors"
            >
              Matches
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;