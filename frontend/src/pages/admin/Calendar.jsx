import React, { useState } from 'react';
import './Calender.css'
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const numDaysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  return (
    <div className=''>
      <div className=''>
        <div className="mx-auto max-w-xl p-4 border img234">
          <div className="text-2xl font-bold mb-4">{monthsOfYear[currentMonth]} {currentYear}</div>
          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600">{day}</div>
            ))}
            {[...Array(numDaysInMonth)].map((_, index) => {
              const dayOfMonth = index + 1;
              const isCurrentDay = currentYear === selectedDate?.getFullYear() && currentMonth === selectedDate?.getMonth() && dayOfMonth === selectedDate?.getDate();
              const isToday = currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth() && dayOfMonth === new Date().getDate();
              const isPastDay = currentYear > selectedDate?.getFullYear() || (currentYear === selectedDate?.getFullYear() && (currentMonth > selectedDate?.getMonth() || (currentMonth === selectedDate?.getMonth() && dayOfMonth > selectedDate?.getDate())));
              return (
                <div
                  key={index}
                  className={`text-center p-2 rounded-full cursor-pointer ${isCurrentDay ? 'bg-blue-500 text-white' : isToday ? 'bg-green-500 text-white' : 'hover:bg-gray-200'} ${isPastDay ? 'text-gray-400 cursor-not-allowed' : ''}`}
                  onClick={() => handleDateClick(new Date(currentYear, currentMonth, dayOfMonth))}
                >
                  {dayOfMonth}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
