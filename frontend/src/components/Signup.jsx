import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const addUser = {name, email, password};
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setError("");
      navigate("/login");
    }
  };

  return (
    <>
      {error && (
        <div
          role="alert"
          className="alert alert-error mx-30 mt-6 flex items-center justify-between"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2">{error}</span>
          </div>
          <button
            onClick={() => setError("")}
            className="btn btn-sm btn-circle btn-ghost ml-2"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
      <form
        onSubmit={handleSignup}
        className="h-[calc(100vh-7rem)] flex items-center justify-center"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="font-bold text-2xl mb-1">Signup</div>

          <label className="label">Username</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-neutral mt-4 bg-lime-400 text-slate-800"
          >
            Signup
          </button>
          <div className="pt-1.5 text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Signup;
