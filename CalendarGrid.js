import React from 'react';

const CalendarGrid = ({ days, onDayClick, activities }) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
        <div key={day} className="text-center text-sm py-1">
          {day}
        </div>
      ))}
      {days.map((day, index) => (
        <div 
          key={index}
          onClick={() => onDayClick(day)}
          className={`h-12 p-1 border rounded cursor-pointer hover:bg-gray-50 text-center ${
            day.selected ? 'bg-green-50 border-green-200' : ''
          }`}
        >
          <div className="text-xs">{day.date}</div>
          <div className="flex justify-center mt-1">
            {activities.some(act => act.date === day.fullDate) && (
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;