"use client";
import { useState } from "react";
import NewMemberForm from "@/components/NewMembers";

const SignUpPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    age: number;
    gender: string;
    level: string;
  } | null>(null);

  const handleSignUp = (data: {
    name: string;
    age: number;
    gender: string;
    level: string;
  }) => {
    // Here you can handle the form submission, e.g., send data to your API
    console.log("Sign Up Data:", data);
    setSubmittedData(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <NewMemberForm onSubmit={handleSignUp} />
        {submittedData && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="text-xl font-semibold mb-2">Form Submitted</h2>
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Age:</strong> {submittedData.age}
            </p>
            <p>
              <strong>Gender:</strong> {submittedData.gender}
            </p>
            <p>
              <strong>Level:</strong> {submittedData.level}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
