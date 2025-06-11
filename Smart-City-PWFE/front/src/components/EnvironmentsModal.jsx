import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EnvironmentsModal({ isOpen, onClose, onSave, ambienteData }) {
  const [descricao, setDescricao] = useState(ambienteData?.descricao || "");
  const [sig, setSig] = useState(ambienteData?.sig || "");
  const [ni, setNi] = useState(ambienteData?.ni || "");
  const [responsavel, setResponsavel] = useState(ambienteData?.responsavel || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ambienteData) {
      setDescricao(ambienteData.descricao || "");
      setSig(ambienteData.sig || "");
      setNi(ambienteData.ni || "");
      setResponsavel(ambienteData.responsavel || "");
    }
  }, [ambienteData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao || !sig || !ni || !responsavel) {
      alert("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = ambienteData
        ? `http://127.0.0.1:8000/api/ambientes/${ambienteData.id}`
        : "http://127.0.0.1:8000/api/ambientes";
      const method = ambienteData ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: {
          descricao,
          sig,
          ni,
          responsavel,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSave(response.data);

      alert(ambienteData ? "Environment updated successfully!" : "Environment created successfully!");

      onClose();
    } catch (err) {
      console.error("Error saving environment:", err.response?.data || err.message);
      setError("Error saving environment. Please check the fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fundo desfocado */}
      <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg !p-6 w-[500px] max-w-full border-4 border-[#3C096C]">
          <h2 className="text-2xl font-semibold mb-4 league-regular">
            {ambienteData ? "Edit Environment" : "New Environment"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Descrição */}
            <label className="league-regular">
              Description:
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="E.g.: Biblioteca"
                className="border border-gray-300 rounded p-2 w-full league-regular"
                required
              />
            </label>

            {/* SIG */}
            <label className="league-regular">
              SIG:
              <input
                type="text"
                value={sig}
                onChange={(e) => setSig(e.target.value)}
                placeholder="E.g.: 20400004"
                className="border border-gray-300 rounded p-2 w-full league-regular"
                required
              />
            </label>

            {/* NI */}
            <label className="league-regular">
              NI:
              <input
                type="text"
                value={ni}
                onChange={(e) => setNi(e.target.value)}
                placeholder="E.g.: SN74604"
                className="border border-gray-300 rounded p-2 w-full league-regular"
                required
              />
            </label>

            {/* Responsável */}
            <label className="league-regular">
              Responsible:
              <input
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                placeholder="E.g.: Lucas Bareli"
                className="border border-gray-300 rounded p-2 w-full league-regular"
                required
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-4 !mt-5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200 w-24 league-regular cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#3C096C] text-white rounded hover:bg-[#7625c2] w-24 league-regular cursor-pointer"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
