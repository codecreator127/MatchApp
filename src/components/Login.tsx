import Image from "next/image";
import React, { useState, FormEvent } from "react";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

interface LoginProps {
  auth: Auth;
}

const Login: React.FC<LoginProps> = ({ auth }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  //   const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // Check if email and password are provided
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all the fields.");
      return;
    }
    // Handle form submission logic here
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
      // Additional logic after successful login
      window.location.href = "/swiper";
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.log("Login error:", error);
      // Handle login error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-500 to-orange-400 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          {/* <Image
            src="/tinder-logo.png"  // Replace with your logo path
            alt="Tinder Logo"
            width={80}
            height={80}
          /> */}
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">Sign in</h1>

        <p className="text-center text-gray-600 mb-6">
          By clicking Log In, you agree to our Terms. Learn how we process your
          data in our Privacy Policy and Cookies Policy.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold py-3 px-4 rounded-full hover:opacity-90 transition duration-300"
          >
            Log In
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <Link href="/signup" className="text-pink-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
