import React, { useState, FormEvent } from "react";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

import { auth, db } from "../../firebase/firebase";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";

interface SignUpProps {
  auth: Auth;
}

const SignUp: React.FC<SignUpProps> = ({ auth }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up successfully");
      // Additional logic after successful signup

      const userRef = doc(db, "users", user.uid);
      const collectionRef = collection(userRef, "plants");

      await setDoc(userRef, {
        email: user.email,
      });

      await addDoc(collectionRef, {
        name: "plant",
      });

      console.log("User added to Firestore successfully");

      window.location.href = "/preferences";
    } catch (error) {
      setError("Error creating account.");
      console.log("Signup error:", error);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-400 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <p className="text-center text-gray-600 mb-6">
          Create an account to get started. By signing up, you agree to our
          Terms of Service and Privacy Policy.
        </p>

        <form onSubmit={handleSignUp}>
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-400 text-white font-bold py-3 px-4 rounded-full hover:opacity-90 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
