import React from "react";

function Information() {
    return (
        <div className="flex flex-col overflow-auto">
            <div className="flex flex-col items-center justify-center bg-gray-800">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <div className="mb-4">
                        <h1 className="block text-gray-700 font-bold text-2xl">
                            INFORMATION
                        </h1>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            Plant Name
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Age:
                        </label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            Plant Age
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Plant Type:
                        </label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            Plant Type
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description:
                        </label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;
