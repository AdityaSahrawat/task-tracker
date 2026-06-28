import { FaClipboardList, FaPlus } from 'react-icons/fa';

const EmptyState = ({ onAddTask }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm max-w-md mx-auto my-8">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <FaClipboardList className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-8">
                Get started by creating your very first task to stay organized and productive.
            </p>
            <button
                onClick={onAddTask}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
                <FaPlus />
                <span>Create Your First Task</span>
            </button>
        </div>
    );
};

export default EmptyState;
