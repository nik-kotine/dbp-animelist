import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('apiKey');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:underline hover:bg-gray-950 p-4 rounded-2xl transition-colors">Dashboard</Link>
        <Link to="/characters" className="hover:underline hover:bg-gray-950 p-4 rounded-2xl transition-colors">Personajes</Link>
        <Link to="/characters/new" className="hover:underline hover:bg-gray-950 p-4 rounded-2xl transition-colors">Nuevo</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
        Cerrar sesión
      </button>
    </nav>
  );
}
