export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
