import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import type Character from './Character';

export default function CharacterForm() {
  const [name, setName] = useState('');
  const [anime, setAnime] = useState('');
  const [power, setPower] = useState('');
  const [ability, setAbility] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [existingNames, setExistingNames] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/characters')
      .then(res => {
        const names = res.data.map((c: Character) => c.name.toLowerCase());
        setExistingNames(names);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    setError('');

    const powerNumber = Number(power);

    if (!name || !anime || !power || !ability) {
      setError('Todos los campos excepto comentario son obligatorios.');
      return;
    }

    if (isNaN(powerNumber) || powerNumber < 0 || powerNumber > 9000) {
      setError('El poder debe estar entre 0 y 9000.');
      return;
    }

    if (existingNames.includes(name.toLowerCase())) {
      setError('Ya existe un personaje con ese nombre.');
      return;
    }

    const newCharacter = { name, anime, power: powerNumber, ability, comment };

    try {
      await api.post('/characters', newCharacter);
      navigate('/characters');
    } catch (err) {
      setError('No se pudo registrar el personaje.');
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar Personaje</h1>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <div className="flex flex-col space-y-3">
        <input className="p-2 bg-gray-800 rounded-full" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
        <input className="p-2 bg-gray-800 rounded-full" placeholder="Anime" value={anime} onChange={e => setAnime(e.target.value)} />
        <input className="p-2 bg-gray-800 rounded-full" placeholder="Nivel de poder (0–9000)" value={power} onChange={e => setPower(e.target.value)} />
        <input className="p-2 bg-gray-800 rounded-full" placeholder="Habilidad especial" value={ability} onChange={e => setAbility(e.target.value)} />
        <input className="p-2 bg-gray-800 rounded-full" placeholder="Comentario (opcional)" value={comment} onChange={e => setComment(e.target.value)} />

        <button className="bg-green-600 p-2 rounded" onClick={handleSubmit}>
          Registrar
        </button>
      </div>
    </div>
  );
}
