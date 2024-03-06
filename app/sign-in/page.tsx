"use client";
import Link from "next/link";
import { useCrypto } from "../Providers/CryptoProvider";

const SignIn = () => {
  const {
    handleSignIn,
    email,
    password,
    handlePassword,
    handleEmail,
    palette,
    mode,
  } = useCrypto();

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
          onClick={handleSignIn}
          className="w-full p-3 bg-accent rounded text-white hover:bg-primary"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
