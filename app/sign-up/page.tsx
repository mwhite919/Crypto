"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useCrypto } from "../Providers/CryptoProvider";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
    auth
  );

  const {
    loginError,
    handleSignUp,
    handlePassword,
    handleEmail,
    mode,
    palette,
  } = useCrypto();

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-base theme-${palette} theme-${mode} top-36`}
    >
      <div className="bg-second p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-accent text-2xl">Sign up for a free account!</h1>
        <div className="text-primary my-2">
          Already have an account? Click{" "}
          <Link
            href="/sign-in"
            className="cursor-pointer text-accent  hover:scale-105"
          >
            here
          </Link>{" "}
          to login!
        </div>
        {loginError && (
          <div className="text-red-600 text-xs">
            That login information was incorrect. Please sign up below for a
            free account!{" "}
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
