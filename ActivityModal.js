import React, { useState, useEffect } from 'react';

const ActivityModal = ({ onClose, onSave, activity }) => {
  const [formData, setFormData] = useState(activity || {
    platform: 'Facebook',
    otherPlatform: '', // Nuevo campo para "Otra" plataforma
    startTime: '',
    endTime: '',
    description: '',
    fileLink: ''
  });

  // Actualizar formData si la actividad cambia (para edición)
  useEffect(() => {
    if (activity) {
      setFormData(activity);
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Registrar Actividad</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Plataforma</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Ambas">Ambas</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
          
          {formData.platform === 'Otra' && (
            <div className="mb-4">
              <label className="block mb-2">Especifica la plataforma</label>
              <input
                type="text"
                name="otherPlatform"
                value={formData.otherPlatform}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Ej: TikTok, LinkedIn, etc."
                required
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Hora inicio</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Hora fin</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Link de Evidencia (Imagen/Drive)</label>
            <input
              type="url"
              name="fileLink"
              value={formData.fileLink}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg o link de Drive"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;