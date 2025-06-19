import React from 'react';

const ActivityList = ({ activities, onEdit, onDelete }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Actividades Registradas</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  activity.platform === 'Facebook' ? 'bg-blue-500' :
                  activity.platform === 'Instagram' ? 'bg-purple-500' :
                  activity.platform === 'Ambas' ? 'bg-orange-500' :
                  'bg-gray-500' // Color para "Otra"
                }`}></span>
                <span className="font-medium">
                  {activity.platform === 'Otra' ? activity.otherPlatform : activity.platform}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {activity.date} • {activity.startTime} - {activity.endTime} ({activity.hours} hrs)
              </div>
            </div>
            <p className="mt-2">{activity.description}</p>
            {activity.fileLink && (
              <div className="mt-2">
                <span className="text-sm text-gray-500">Evidencia:</span>
                <a 
                  href={activity.fileLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-blue-600 hover:underline text-sm mt-1"
                >
                  {activity.fileLink.length > 50 ? activity.fileLink.substring(0, 47) + '...' : activity.fileLink}
                </a>
                {/* Vista previa de imagen si el link es de imagen */}
                {(activity.fileLink.match(/\.(jpeg|jpg|gif|png|webp)$/) != null) && (
                  <img 
                    src={activity.fileLink} 
                    alt="Evidencia" 
                    className="w-24 h-24 object-cover rounded mt-2" 
                  />
                )}
              </div>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => onEdit(activity)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(activity)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;