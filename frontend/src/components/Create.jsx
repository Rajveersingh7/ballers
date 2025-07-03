import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Create = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [pace, setPace] = useState(null);
  const [dribbling, setDribbling] = useState(null);
  const [shooting, setShooting] = useState(null);
  const [defending, setDefending] = useState(null);
  const [passing, setPassing] = useState(null);
  const [physicality, setPhysicality] = useState(null);
  const [overall, setOverall] = useState(null);
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("pace", pace ? Number(pace) : "");
    formData.append("dribbling", dribbling ? Number(dribbling) : "");
    formData.append("shooting", shooting ? Number(shooting) : "");
    formData.append("defending", defending ? Number(defending) : "");
    formData.append("passing", passing ? Number(passing) : "");
    formData.append("physicality", physicality ? Number(physicality) : "");
    formData.append("overall", overall ? Number(overall) : "");
    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setName("");
      setPosition("");
      setPace(null);
      setDribbling(null);
      setShooting(null);
      setDefending(null);
      setPassing(null);
      setPhysicality(null);
      setOverall(null);
      setImage(null);
      setError("");

      navigate("/");
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
      <div className="flex justify-start">
        <form onSubmit={handleSubmit} className="pt-13 mx-30 w-full">
          <p className="text-5xl text-lime-400 font-bold mb-2">Create a card</p>
          <div className="flex w-full">
            <fieldset className="fieldset mt-1 ml-0.5 w-1/2 mr-2">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Player
              </legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter player name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset mt-1 ml-0.5 w-1/2">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Position
              </legend>
              <input
                type="text"
                className="input w-full"
                placeholder="eg. ST, LW, RW, CAM, CM, CDM, LB, RB, CB, GK"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </fieldset>
          </div>
          {/* Pace, Dribbling, Shooting in one row */}
          <div className="flex w-full">
            <fieldset className="fieldset ml-0.5 w-1/3 mr-2">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Pace
              </legend>
              <input
                type="number"
                min={1}
                max={99}
                className="input w-full"
                placeholder="1-99"
                value={pace || ""}
                onChange={(e) => setPace(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset ml-0.5 w-1/3 mr-2">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Dribbling
              </legend>
              <input
                type="number"
                min={1}
                max={99}
                className="input w-full"
                placeholder="1-99"
                value={dribbling || ""}
                onChange={(e) => setDribbling(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset ml-0.5 w-1/3">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Shooting
              </legend>
              <input
                type="number"
                min={1}
                max={99}
                className="input w-full"
                placeholder="1-99"
                value={shooting || ""}
                onChange={(e) => setShooting(e.target.value)}
              />
            </fieldset>
          </div>
          {/* Defending, Passing, Physicality in one row */}
          <div className="flex w-full mt-2">
            <fieldset className="fieldset ml-0.5 w-1/3 mr-2">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Defending
              </legend>
              <input
                type="number"
                min={1}
                max={99}
                className="input w-full"
                placeholder="1-99"
                value={defending || ""}
                onChange={(e) => setDefending(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset ml-0.5 w-1/3 mr-2">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Passing
              </legend>
              <input
                type="number"
                min={1}
                max={99}
                className="input w-full"
                placeholder="1-99"
                value={passing || ""}
                onChange={(e) => setPassing(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset ml-0.5 w-1/3">
              <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
                Physicality
              </legend>
              <input
                type="number"
                min={1}
                max={99}
                className="input w-full"
                placeholder="1-99"
                value={physicality || ""}
                onChange={(e) => setPhysicality(e.target.value)}
              />
            </fieldset>
          </div>
          <fieldset className="fieldset ml-0.5">
            <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
              Overall
            </legend>
            <input
              type="number"
              min={1}
              max={99}
              className="input w-full"
              placeholder="1-99"
              value={overall || ""}
              onChange={(e) => setOverall(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset ml-0.5">
            <legend className="fieldset-legend text-lg font-semibold mb-[-8px]">
              Image
            </legend>
            <input
              type="file"
              className="file-input"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </fieldset>
          <button
            type="submit"
            className="btn btn-ghost bg-lime-400 text-slate-800 rounded-md mt-4 text-base ml-0.5"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
