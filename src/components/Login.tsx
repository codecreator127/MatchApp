import Image from "next/image";
import React, { useState, FormEvent } from "react";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import logo from "../../public/logo.png";

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
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#c5d8cf" }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <img
            src={logo.src}
            alt="Logo"
            className="mx-auto mb-4"
            style={{ width: 200 }}
          />
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
            className="w-full text-white font-bold py-3 px-4 rounded-full hover:opacity-90 transition duration-300"
            style={{ backgroundColor: "#357960" }}
          >
            Log In
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <Link
            href="/signup"
            className="hover:underline"
            style={{ color: "#357960" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
