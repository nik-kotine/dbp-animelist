import { useEffect, useState } from 'react';
import api from '../api';
import type Character from './Character';
import CharacterCard from './CharacterCard';

export default function Dashboard() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [mostPowerful, setMostPowerful] = useState<Character | null>(null);

  useEffect(() => {
    api.get('/characters')
      .then(res => {
        setCharacters(res.data);

        if (res.data.length > 0) {
          const strongest = res.data.reduce((max: Character, current: Character) =>
            current.power > max.power ? current : max
          );
          setMostPowerful(strongest);
        }
      })
      .catch(err => {
        console.error('Error:', err.response?.data?.message);
      });
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-neutral-600 rounded-2xl p-4 mb-4 text-lg">Total de personajes: <strong>{characters.length}</strong></div>

      {mostPowerful && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personaje con más poder</h2>
          <CharacterCard character={mostPowerful} />
        </div>
      )}
    </div>
  );
}
