import React from 'react';

const DayActivitiesModal = ({ activities, onClose, onEdit, onCreateNew }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Actividades del Día</h3>
        
        {activities.length === 0 ? (
          <p className="text-gray-600 mb-4">No hay actividades registradas para este día.</p>
        ) : (
          <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
            {activities.map((activity, index) => (
              <div key={index} className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {activity.platform === 'Otra' ? activity.otherPlatform : activity.platform} ({activity.hours} hrs)
                  </p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <button
                  onClick={() => onEdit(activity)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={onCreateNew}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Crear Nueva
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayActivitiesModal;

// DONE