import React, {useEffect, useState} from "react";

const Banner = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
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
      setError("");
      setData((prevData) => prevData.filter((item) => item._id !== id));
    }
  };

  async function getData() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/my-cards`, {
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
      setData(result);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {error && (
        <div role="alert" className="alert alert-error mx-30 mt-6">
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
          <span>{error}</span>
        </div>
      )}
      <div className="flex justify-center">
        <p className="text-7xl font-bold pt-12 mx-30 leading-[1.15]">
          Welcome! this is where you can create custom{" "}
          <span className="text-lime-400">football cards!!!</span>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-y-7 mx-30 mt-10 mb-4">
        {data &&
          data.map((ele) => (
            <div
              key={ele._id}
              className="card bg-base-100 image-full w-72 h-96 rounded-none cursor-pointer"
              onClick={() => {
                setSelectedCard(ele);
                setShowModal(true);
              }}
            >
              <figure>
                <img
                  src={
                    ele.image
                      ? ele.image
                      : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                />
              </figure>
              <div className="card-body relative flex">
                <div className="absolute top-6 left-6">
                  <div className="font-semibold text-4xl">{ele.overall}</div>
                  <div className="text-center text-2xl mt-[-4px]">
                    {ele.position.toUpperCase()}
                  </div>
                </div>
                <div className="mt-auto text-center">
                  <div className="font-semibold text-2xl mb-1">
                    {ele.name.toUpperCase()}
                  </div>
                  <hr className="mx-6" />
                  <div className="grid grid-cols-2 text-[20px] mt-1">
                    <div>
                      <span className="font-semibold">{ele.pace}</span> PAC
                    </div>
                    <div>
                      <span className="font-semibold">{ele.dribbling}</span> DRI
                    </div>
                    <div>
                      <span className="font-semibold">{ele.shooting}</span> SHO
                    </div>
                    <div>
                      <span className="font-semibold">{ele.defending}</span> DEF
                    </div>
                    <div>
                      <span className="font-semibold">{ele.passing}</span> PAS
                    </div>
                    <div>
                      <span className="font-semibold">{ele.physicality}</span>
                      {"  "}
                      PHY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showModal && selectedCard && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box">
            <p className="py-4">Are you sure you want to delete this card ?</p>
            <div className="modal-action">
              <button
                className="btn btn-error btn-soft"
                onClick={async () => {
                  await handleDelete(selectedCard._id);
                  setShowModal(false);
                  setSelectedCard(null);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedCard(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Banner;
