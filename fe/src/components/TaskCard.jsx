import { FaEdit, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { formatDate, getStatusColor, getStatusText, isOverdue } from '../utils/helpers';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const overdue = isOverdue(task.dueDate, task.status);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{task.description}</p>

                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                    {task.dueDate && (
                        <div className={`flex items-center gap-2 ${overdue ? 'text-red-600' : ''}`}>
                            <FaCalendarAlt className="text-xs" />
                            <span className={overdue ? 'font-medium' : ''}>
                                {overdue ? 'Overdue: ' : 'Due: '}
                                {formatDate(task.dueDate)}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <FaClock className="text-xs" />
                        <span>Created: {formatDate(task.createdAt)}</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                        onClick={() => onEdit(task)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <FaEdit />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => onDelete(task)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <FaTrash />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
