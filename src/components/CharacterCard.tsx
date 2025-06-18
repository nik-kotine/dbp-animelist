import type Character from './Character';

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform">
      <h3 className="text-xl text-white mb-1 font-black">{character.name}</h3>
      <p><span className="font-bold text-gray-300">Anime:</span> {character.anime}</p>
      <p><span className="font-bold text-gray-300">Poder:</span> {character.power}</p>
      <p><span className="font-bold text-gray-300">Habilidad:</span> {character.ability}</p>
      {character.comment && (
        <p className="text-sm text-gray-400 mt-2 italic">"{character.comment}"</p>
      )}
    </div>
  );
}
