import React, { useState } from 'react';

const HeaderSettings = ({ title, operator, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title, operator });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="mb-6 relative">
      {!isEditing ? (
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-600">Operador: {operator}</p>
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 text-sm text-blue-600 hover:text-blue-800"
          >
            Editar
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border p-4 rounded-lg bg-white">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Título de la página</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Nombre del operador</label>
            <input
              type="text"
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HeaderSettings;