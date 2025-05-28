import React, { useState, useEffect } from "react";
import axios from "axios";

const SENSOR_TYPES = [
  { value: "temperatura", label: "Temperature (°C)" },
  { value: "umidade", label: "Humidity (%)" },
  { value: "luminosidade", label: "Luminosity (lux)" },
  { value: "contador", label: "Counter (num)" },
];

export default function SensorModal({ isOpen, onClose, onSave, sensorData }) {
  const [sensor, setSensor] = useState(sensorData?.sensor || "");
  const [status, setStatus] = useState(sensorData?.status ?? true);
  const [macAddress, setMacAddress] = useState(sensorData?.mac_address || "");
  const [latitude, setLatitude] = useState(sensorData?.latitude || "");
  const [longitude, setLongitude] = useState(sensorData?.longitude || "");
  const [unidadeMed, setUnidadeMed] = useState(sensorData?.unidade_med || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sensorData) {
      setSensor(sensorData.sensor || "");
      setStatus(sensorData.status ?? true);
      setMacAddress(sensorData.mac_address || "");
      setLatitude(sensorData.latitude || "");
      setLongitude(sensorData.longitude || "");
      setUnidadeMed(sensorData.unidade_med || "");
    }
  }, [sensorData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sensor || !macAddress || !latitude || !longitude || !unidadeMed) {
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
      const url = sensorData
        ? `http://127.0.0.1:8000/api/sensores/${sensorData.id}`
        : "http://127.0.0.1:8000/api/sensores";
      const method = sensorData ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: {
          sensor,
          status,
          mac_address: macAddress,
          latitude,
          longitude,
          unidade_med: unidadeMed,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSave(response.data);
      onClose();
    } catch (err) {
      console.error("Error saving sensor:", err.response?.data || err.message);
      setError("Error saving sensor. Please check the fields and try again.");
    } finally {
      setLoading(false);
    }
  };

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
          {/* Sensor Type */}
          <label className="league-regular">
            Sensor Type:
            <select
              value={sensor}
              onChange={(e) => setSensor(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            >
              <option value="" disabled className="league-regular">
                Select sensor type
              </option>
              {SENSOR_TYPES.map((option) => (
                <option key={option.value} value={option.value} className="league-regular">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {/* Status */}
          <label className="league-regular">
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value === "true")}
              className="border border-gray-300 rounded p-2 w-full league-regular"
            >
              <option value="true" className="league-regular">Active</option>
              <option value="false" className="league-regular">Inactive</option>
            </select>
          </label>

          {/* MAC Address */}
          <label className="league-regular">
            MAC Address:
            <input
              type="text"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              placeholder="00:1A:C2:7B:00:47"
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            />
          </label>

          {/* Latitude */}
          <label className="league-regular">
            Latitude:
            <input
              type="number"
              step="0.000001"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="E.g.: -23.550520"
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            />
          </label>

          {/* Longitude */}
          <label className="league-regular">
            Longitude:
            <input
              type="number"
              step="0.000001"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="E.g.: -46.633308"
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            />
          </label>

          {/* Measurement Unit */}
          <label className="league-regular">
            Measurement Unit:
            <input
              type="text"
              value={unidadeMed}
              onChange={(e) => setUnidadeMed(e.target.value)}
              placeholder="E.g.: °C, %, lux, num"
              className="border border-gray-300 rounded p-2 w-full league-regular"
              required
            />
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-5">
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
  );
}
