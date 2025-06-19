import React, { useState } from 'react';

const DataManagement = ({ onImport, onExport }) => {
  const [importData, setImportData] = useState('');

  const handleExport = () => {
    const data = onExport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ppa_cm_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const parsedData = JSON.parse(importData);
      onImport(parsedData);
      alert('Datos importados correctamente. ¡Actualiza la página para ver los cambios!');
      setImportData('');
    } catch (error) {
      alert('Error al importar los datos. Asegúrate de que el formato sea JSON válido.');
      console.error('Error importing data:', error);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-4">Gestión de Datos</h3>
      
      <div className="mb-4">
        <button
          onClick={handleExport}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Exportar Datos (JSON)
        </button>
        <p className="text-sm text-gray-600 mt-2">Guarda tus datos en un archivo para respaldarlos o moverlos a otro dispositivo.</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Importar Datos (Pega el JSON aquí)</label>
        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          className="w-full p-2 border rounded-lg resize-y"
          rows="6"
          placeholder="Pega aquí el contenido JSON de tus datos exportados..."
        ></textarea>
        <button
          onClick={handleImport}
          className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Importar Datos
        </button>
        <p className="text-sm text-gray-600 mt-2">Pega el contenido de un archivo JSON exportado para cargar tus datos.</p>
      </div>
    </div>
  );
};

export default DataManagement;