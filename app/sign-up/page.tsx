"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
    auth
  );

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="bg-second p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-accent text-2xl mb-5">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-accent2 rounded outline-none text-primary placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
