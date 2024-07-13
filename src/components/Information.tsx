import React from "react";

interface InformationProps {
  name: string;
  age: number;
  type: string;
  needs: string;
  description: string;
}

function Information(info: InformationProps) {

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center bg-gray-800" >
        <div className="bg-white p-6 shadow-lg w-full max-w-md">
          <div className="mb-4">
            <h1 className="block text-gray-700 font-bold text-2xl">
              PLANT INFORMATION
            </h1>
          </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Plant Name:
              </label>
              <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {info.name}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Plant Age:
              </label>
              <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {info.age}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Plant Type:
              </label>
              <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {info.type}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Plant Needs:
              </label>
              <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {info.needs}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Plant Description:
              </label>
              <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {info.description}
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Information;