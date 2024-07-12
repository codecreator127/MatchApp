import React from 'react';

interface PokemonDictionary {
  [key: string]: string;
}

interface PokedexProps {
  pokemon: PokemonDictionary;
}

const Pokedex: React.FC<PokedexProps> = ({ pokemon }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(pokemon).map(([name, imageUrl]) => (
          <div key={name} className="bg-white rounded-lg shadow-md p-4">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-48 object-contain mb-2"
            />
            <h2 className="text-center font-bold text-lg">{name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;