"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useCrypto } from "../Providers/CryptoProvider";
import { login, useAuth } from "../firebase/config";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { handleLoginError, loginError, palette, mode } = useCrypto();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useAuth();
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      if (currentUser) {
        router.push("/portfolio");
        return;
      }
    } catch (e) {
      console.error(e);
      handleLoginError();
    }
    setLoading(false);
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-base theme-${palette} theme-${mode} top-36`}
    >
      <div className="bg-second p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-accent text-2xl ">Sign In</h1>
        <div className="text-primary my-2">
          New here? Click{" "}
          <Link
            href="/sign-up"
            className="cursor-pointer text-accent mb-2 hover:scale-105"
          >
            here
          </Link>{" "}
          to sign-up!
        </div>
        {loginError && (
          <p>
            "Sorry about that, there was an error logging in, please try again."
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="w-full p-3 mb-4 rounded outline-none text-primary placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="w-full p-3 mb-4 rounded outline-none text-primary placeholder-gray-500"
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-accent rounded text-white hover:border-primary"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
