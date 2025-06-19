import React from 'react';

const CalendarHeader = ({ month, year, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button 
        onClick={onPrevMonth}
        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        &lt;
      </button>
      <h2 className="text-xl font-semibold">
        {month} {year}
      </h2>
      <button 
        onClick={onNextMonth}
        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        &gt;
      </button>
    </div>
  );
};

export default CalendarHeader;