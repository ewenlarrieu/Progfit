import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) return; // Éviter les appels multiples
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 4000); 

    return () => clearTimeout(timer);
  }, []); // Retirer la dépendance onClose

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type];

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }[type];

  return (
    <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[500px] ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}
     style={{ fontFamily: 'Poppins, sans-serif'}}>
      <span className="text-2xl font-bold">{icon}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={handleClose}
        className="text-white hover:text-gray-200 transition-colors text-xl font-bold leading-none"
        aria-label="Fermer"
      >
        ×
      </button>
    </div>
  );
}
