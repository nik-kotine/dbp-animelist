import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (key.trim()) {
      localStorage.setItem('apiKey', key);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Ingresa tu API Key</h2>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Tu API Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          Ingresar
        </button>
        <p className='font-bold text-neutral-300 text-justify'> Nota: este login siempre permitirá ingresar. </p>
      </div>
    </div>
  );
}
