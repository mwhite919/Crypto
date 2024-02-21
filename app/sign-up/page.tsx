"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useCrypto } from "../Providers/CryptoProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
    auth
  );

  const { loginError, handleSignUp, handlePassword, handleEmail } = useCrypto();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="bg-second p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-accent text-2xl mb-5">
          Sign up for a free account!
        </h1>
        <p>
          Already have an account? Click
          <Link href="/sign-in" className="hover:scale-105">
            here
          </Link>
          to login!
        </p>
        {loginError && (
          <div className="text-red-800 text-xs">
            That login information was incorrect. Please sign up for a free
            account!{" "}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmail(e)}
          className="w-full p-3 mb-4 bg-accent2 rounded outline-none text-primary placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handlePassword(e)}
          className="w-full p-3 mb-4 bg-accent2 rounded outline-none text-primary placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-accent rounded text-white hover:bg-primary"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
