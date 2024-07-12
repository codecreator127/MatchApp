import React, { useState } from 'react';

const Orders: React.FC = () => {
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [result, setResult] = useState<string>('');

  const divs: { name: string; action: () => void }[] = [
    {
      name: 'Buy',
      action: () => alert('Redirect to Plantbarn?')
    },
    {
      name: 'Trade',
      action: () => alert('Only appear if there is one available in area')
    },
    {
      name: 'Claim',
      action: () => alert('Only appear if someone has put one up')
    },
    {
      name: 'Sponsor',
      action: () => alert('Redirect to sponsor page?')
    }
  ];

  const handleClick = (index: number): void => {
    setActiveDiv(index);
    divs[index].action();
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto space-y-4 p-4">
      {divs.map((div, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`
            w-full h-[100px] flex justify-center items-center cursor-pointer
            transition-colors duration-300 rounded-lg
            ${activeDiv === index ? 'bg-gray-300' : 'bg-gray-100'}
            hover:bg-gray-200
          `}
        >
          {div.name}
        </div>
      ))}
    </div>
  );
};

export default Orders;