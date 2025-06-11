import React, { useState, useEffect } from "react";
import axios from "axios";

export const DropdownMenu = ({
  onSensorChange,
  sensors = [],
  selectedSensor,
  selectedPeriodStart,
  selectedPeriodEnd,
  setSelectedPeriodStart,
  setSelectedPeriodEnd,
  setSelectedSensor,
}) => {

  // Carregar sensores
  useEffect(() => {
    const fetchSensors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/sensores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSensorChange(response.data);
      } catch (error) {
        console.error("Erro ao buscar sensores:", error);
      }
    };

    fetchSensors();
  }, [onSensorChange]);

  // Atualiza os dados filtrados quando o filtro é alterado
  useEffect(() => {
    const fetchHistoricosByFilter = async () => {
      if (!selectedSensor || !selectedPeriodStart || !selectedPeriodEnd) return;

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }

      try {
        const url = `http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor=${selectedSensor.id}&data_inicial=${selectedPeriodStart}&data_final=${selectedPeriodEnd}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Dados históricos filtrados:", response.data);
      } catch (error) {
        console.error("Erro ao buscar dados históricos com filtro:", error);
      }
    };

    fetchHistoricosByFilter();
  }, [selectedSensor, selectedPeriodStart, selectedPeriodEnd]);

  return (
    <div className="flex items-center justify-between p-4 !mt-30 !ml-15">
      <div className="flex gap-4 mb-4">
        {/* Os dados estão em português, porque o banco esta populado em português, com isso para funcionar precisei "misturar" duas linguas, porque quis desenvolver em inglês para treinar */}
        <label className="league-regular">
          First Day:
          <input
            type="datetime-local"
            value={selectedPeriodStart}
            onChange={(e) => setSelectedPeriodStart(e.target.value)}
            style={{ marginLeft: '10px' }}
            className="border border-[#3C096C] rounded px-2 py-1 league-regular cursor-pointer"
          />
        </label>
        <label className="league-regular">
          Last Day:
          <input
            type="datetime-local"
            value={selectedPeriodEnd}
            onChange={(e) => setSelectedPeriodEnd(e.target.value)}
            style={{ marginLeft: '10px' }}
            className="border border-[#3C096C] rounded px-2 py-1 league-regular cursor-pointer"
          />
        </label>
      </div>

      <div className="relative">
        <select
          className="bg-[#17CF96] text-black league-regular px-6 py-2 h-9 rounded-full cursor-pointer !mr-15"
          value={selectedSensor ? selectedSensor.sensor : ""}
          onChange={(e) => {
            const selected = sensors.find(sensor => sensor.sensor === e.target.value);
            console.log("Sensor selecionado:", selected);
            setSelectedSensor(selected || null);
          }}
        >
          <option value="" className="bg-white league-regular">Sensors</option>
          <option value="Temperatura" className="bg-white league-regular">Temperatura</option>
          <option value="Umidade" className="bg-white league-regular">Umidade</option>
          <option value="Contador de Pessoas" className="bg-white league-regular">Contador</option>
          <option value="Luminosidade" className="bg-white league-regular">Luminosidade</option>
        </select>
      </div>
    </div>
  );
};
