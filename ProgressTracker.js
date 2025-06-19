import React from 'react';

const ProgressTracker = ({ hours, goal = 50 }) => {
  const totalMinutes = Math.floor(hours * 60);
  const displayHours = Math.floor(totalMinutes / 60);
  const displayMinutes = totalMinutes % 60;

  const percentage = Math.min((hours / goal) * 100, 100);
  
  return (
    <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Progreso de Horas</h3>
      <div className="mb-2 flex justify-between text-gray-700">
        <span className="font-bold text-xl">{displayHours}h {displayMinutes}m</span>
        <span>Meta: {goal} hrs</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full shadow-inner" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {hours >= goal && (
        <p className="mt-3 text-center text-green-600 font-semibold">¡Felicidades, meta alcanzada!</p>
      )}
    </div>
  );
};

export default ProgressTracker;