import { useEffect, useState } from 'react';
import api from '../api';
import type Character from './Character';
import CharacterCard from './CharacterCard';

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    api.get('/characters')
      .then(res => setCharacters(res.data))
      .catch(err => console.error('Error:', err.response?.data?.message));
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Lista de Personajes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {characters.map(c => (<CharacterCard key={c.id} character={c} />))}
      </div>
    </div>
  );
}
