import React from "react";

interface InformationProps {
  name: string;
  description: string;
}

function Information() {
  const divs = [
    {
      name: "Plant Name",
      description: "Cactus",
    },
    {
      name: "Plant Age",
      description: "13 Years",
    },
    {
      name: "Plant Type",
      description: "Cactaceae",
    },
    {
      name: "Plant Needs",
      description: "Sunlight, water",
    },
    {
      name: "Plant Description",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
  ];

  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex flex-col items-center justify-center bg-gray-800">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="mb-4">
            <h1 className="block text-gray-700 font-bold text-2xl">
              INFORMATION
            </h1>
          </div>
          {divs.map((div, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {div.name}:
              </label>
              <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {div.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

