//
import { FaExclamationTriangle, FaTrash, FaTimes } from 'react-icons/fa';

const DeleteModal = ({ task, onConfirm, onCancel, isLoading }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
                <div className="p-6 text-center">
                    <div className="mx-auto w-14 h-14 flex items-center justify-center bg-red-100 rounded-full mb-4">
                        <FaExclamationTriangle className="text-red-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete Task</h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete <span className="font-medium text-gray-900">"{task?.title}"</span>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            <FaTimes />
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${isLoading
                                    ? 'bg-red-300 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                }`}
                        >
                            <FaTrash />
                            <span>{isLoading ? 'Deleting...' : 'Delete'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
