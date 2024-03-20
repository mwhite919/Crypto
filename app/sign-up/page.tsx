"use client";
import { useState, useRef } from "react";
import { signup, useAuth } from "../firebase/config";
import { useCrypto } from "../Providers/CryptoProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSignUp() {
    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      router.push("/portfolio");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  const { loginError, mode, palette } = useCrypto();

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
          ref={emailRef}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded outline-none text-primary placeholder-gray-500"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded outline-none text-primary placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-accent rounded text-white hover:border-primary"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
