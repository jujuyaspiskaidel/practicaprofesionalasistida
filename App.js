import React, { useState, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import ActivityModal from './components/ActivityModal';
import ActivityList from './components/ActivityList';
import ProgressTracker from './components/ProgressTracker';
import HeaderSettings from './components/HeaderSettings';
import DayActivitiesModal from './components/DayActivitiesModal';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showDayActivitiesModal, setShowDayActivitiesModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [activities, setActivities] = useState(() => {
    // Cargar actividades desde localStorage al iniciar
    const savedActivities = localStorage.getItem('ppa_cm_activities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  });
  const [editingActivity, setEditingActivity] = useState(null);
  const [pageSettings, setPageSettings] = useState(() => {
    // Cargar configuración desde localStorage al iniciar
    const savedSettings = localStorage.getItem('ppa_cm_settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      title: 'Registro PPA Community Manager',
      operator: ''
    };
  });

  // Guardar actividades en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('ppa_cm_activities', JSON.stringify(activities));
  }, [activities]);

  // Guardar configuración en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('ppa_cm_settings', JSON.stringify(pageSettings));
  }, [pageSettings]);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    while (date.getMonth() === month) {
      const day = date.getDate();
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      days.push({
        date: day,
        fullDate,
        selected: selectedDay === fullDate
      });
      
      date.setDate(date.getDate() + 1);
    }
    
    // Add empty days to start from Sunday
    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
      days.unshift({ date: '', fullDate: '' });
    }
    
    return days;
  };

  const handleDayClick = (day) => {
    if (!day.date) return;
    setSelectedDay(day.fullDate);
    const activitiesForDay = activities.filter(act => act.date === day.fullDate);
    
    if (activitiesForDay.length > 0) {
      setShowDayActivitiesModal(true); // Mostrar modal de actividades del día
    } else {
      setShowActivityModal(true); // Mostrar modal para crear nueva actividad
      setEditingActivity(null); // Asegurarse de que no estamos editando
    }
  };

  const handleCreateNewActivity = () => {
    setShowDayActivitiesModal(false); // Cerrar modal de actividades del día
    setShowActivityModal(true); // Abrir modal para crear nueva
    setEditingActivity(null); // Asegurarse de que no estamos editando
  };

  const handleEditActivityFromDayModal = (activityToEdit) => {
    setShowDayActivitiesModal(false); // Cerrar modal de actividades del día
    setEditingActivity(activityToEdit);
    setShowActivityModal(true); // Abrir modal de edición
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSaveActivity = (activity) => {
    const newActivity = {
      ...activity,
      date: selectedDay,
      hours: calculateHours(activity.startTime, activity.endTime)
    };

    if (editingActivity) {
      setActivities(prev => 
        prev.map(act => 
          act === editingActivity ? newActivity : act
        )
      );
      setEditingActivity(null); // Clear editing state after saving
    } else {
      setActivities(prev => [...prev, newActivity]);
    }
    setShowActivityModal(false); // Cerrar modal después de guardar
  };

  const handleEditActivity = (activityToEdit) => {
    setEditingActivity(activityToEdit);
    setSelectedDay(activityToEdit.date); // Set selected day to the activity's date
    setShowActivityModal(true);
  };

  const handleDeleteActivity = (activityToDelete) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      setActivities(prev => prev.filter(act => act !== activityToDelete));
    }
  };

  const calculateHours = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    
    const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    return (totalMinutes / 60); // Retorna en horas decimales para el cálculo total
  };

  const totalHours = activities.reduce((sum, act) => sum + parseFloat(act.hours), 0);

  const handleUpdateSettings = (newSettings) => {
    setPageSettings(newSettings);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <HeaderSettings 
        title={pageSettings.title}
        operator={pageSettings.operator}
        onUpdate={handleUpdateSettings}
      />
      
      <CalendarHeader
        month={months[currentDate.getMonth()]}
        year={currentDate.getFullYear()}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      
      <CalendarGrid
        days={getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())}
        onDayClick={handleDayClick}
        activities={activities}
      />
      
      <ProgressTracker hours={totalHours} />
      
      <ActivityList 
        activities={activities} 
        onEdit={handleEditActivity}
        onDelete={handleDeleteActivity}
      />
      
      {showActivityModal && (
        <ActivityModal
          onClose={() => setShowActivityModal(false)}
          onSave={handleSaveActivity}
          activity={editingActivity}
        />
      )}

      {showDayActivitiesModal && (
        <DayActivitiesModal
          activities={activities.filter(act => act.date === selectedDay)}
          onClose={() => setShowDayActivitiesModal(false)}
          onEdit={handleEditActivityFromDayModal}
          onCreateNew={handleCreateNewActivity}
        />
      )}
    </div>
  );
};

export default App;

// DONE