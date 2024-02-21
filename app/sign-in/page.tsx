"use client";
import { useCrypto } from "../Providers/CryptoProvider";

const SignIn = () => {
  const {
    handleSignIn,
    email,
    password,
    handlePassword,
    handleEmail,
  } = useCrypto();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="bg-second p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-accent text-2xl mb-5">Sign In</h1>
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
