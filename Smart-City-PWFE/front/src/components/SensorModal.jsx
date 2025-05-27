import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SensorModal({ isOpen, onClose, onSave, sensorData }) {
  const [model, setModel] = useState(sensorData?.model || "");
  const [price, setPrice] = useState(sensorData?.price || "");
  const [status, setStatus] = useState(sensorData?.status || "Active");
  const [macAddress, setMacAddress] = useState(sensorData?.macAddress || "");
  const [formData, setFormData] = useState()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sensorData) {
      setFormData({
        nome: sensorData.nome || "",
        unidade_med: sensorData.unidade_med || "",
        status: sensorData.status || false,
        mac_address: sensorData.mac_address || "",
      });
    }
  }, [sensorData]);

  // Função para criar ou editar sensor (POST e PUT)
  async function handleSubmit(e) {
    e.preventDefault();

    if (!model || !price || !macAddress) {
      alert("Model, Price, and Mac-Address are required.");
      return;
    }

    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      return;
    }

    try {
      const url = sensorData ? `http://127.0.0.1:8000/api/sensores/${sensorData.id}` : "http://127.0.0.1:8000/api/sensores";
      const method = sensorData ? "put" : "post";

      await axios({
        method,
        url,
        data: {
          model,
          price,
          status,
          macAddress,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSave();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar sensor:", error);
      setError("Erro ao salvar sensor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Função para excluir sensor (DELETE)
  function handleDelete(sensorToDelete) {
    if (window.confirm("Tem certeza de que deseja excluir este sensor?")) {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://127.0.0.1:8000/api/sensores/${sensorToDelete.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setTableData(tableData.filter((item) => item !== sensorToDelete));
          console.log("Sensor excluído com sucesso.");
        })
        .catch((error) => {
          console.error("Erro ao excluir sensor:", error);
        });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-w-full">
        <h2 className="text-2xl font-semibold mb-4 league-regular">
          {sensorData ? "Edit Sensor" : "New Sensor"}
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="league-regular">
            Model:
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            />
          </label>
          <label className="league-regular">
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            />
          </label>
          <label className="league-regular">
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full league-regular"
            >
              <option value="Active" className="league-regular cursor-pointer">Active</option>
              <option value="Inactive" className="league-regular cursor-pointer">Inactive</option>
            </select>
          </label>
          <label className="league-regular">
            Mac-Address:
            <input
              type="text"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            />
          </label>
          <div className="flex justify-end space-x-2 !mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded league-regular w-30 cursor-pointer"
            >
              Cancel
            </button>
            {sensorData && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded league-regular w-30 cursor-pointer"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-[#3C096C] text-white rounded league-regular w-30 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
