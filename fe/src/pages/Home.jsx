import { useState, useEffect, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import DeleteModal from '../components/DeleteModal';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import { useToast } from '../components/ToastContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('dueDate-asc');
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [deletingTask, setDeletingTask] = useState(null);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const { success, error: showError } = useToast();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to load tasks. Please try again.');
            showError('Failed to load tasks');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredAndSortedTasks = useMemo(() => {
        let result = [...tasks];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(task =>
                task.title.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(task => task.status === statusFilter);
        }

        // Sort
        const [sortField, sortDirection] = sortBy.split('-');
        result.sort((a, b) => {
            const aDate = a[sortField] ? new Date(a[sortField]) : new Date(0);
            const bDate = b[sortField] ? new Date(b[sortField]) : new Date(0);
            if (sortDirection === 'asc') {
                return aDate - bDate;
            }
            return bDate - aDate;
        });

        return result;
    }, [tasks, searchQuery, statusFilter, sortBy]);

    const handleAddTask = () => {
        setEditingTask(null);
        setShowTaskForm(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowTaskForm(true);
    };

    const handleDeleteClick = (task) => {
        setDeletingTask(task);
    };

    const handleFormSubmit = async (formData) => {
        try {
            setIsFormLoading(true);
            if (editingTask) {
                await updateTask(editingTask.id, formData);
                setTasks(prev =>
                    prev.map(t => t.id === editingTask.id ? { ...t, ...formData } : t)
                );
                success('Task updated successfully');
            } else {
                const newTask = await createTask(formData);
                setTasks(prev => [...prev, newTask]);
                success('Task created successfully');
            }
            setShowTaskForm(false);
            setEditingTask(null);
        } catch (err) {
            showError(editingTask ? 'Failed to update task' : 'Failed to create task');
        } finally {
            setIsFormLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            setIsFormLoading(true);
            await deleteTask(deletingTask.id);
            setTasks(prev => prev.filter(t => t.id !== deletingTask.id));
            success('Task deleted successfully');
            setDeletingTask(null);
        } catch (err) {
            showError('Failed to delete task');
        } finally {
            setIsFormLoading(false);
        }
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {import.meta.env.VITE_INSTANCE === 'prod' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-sm font-medium">
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                        <span>make sure be is running on : <a href="https://task-tracker-backend-idko.onrender.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-red-800">https://task-tracker-backend-idko.onrender.com</a></span>
                    </div>
                )}

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Total Tasks</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalTasks}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-semibold text-amber-600">{pendingTasks}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">In Progress</p>
                        <p className="text-2xl font-semibold text-blue-600">{inProgressTasks}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-2xl font-semibold text-emerald-600">{completedTasks}</p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        </div>
                        <div className="lg:w-96">
                            <FilterBar
                                statusFilter={statusFilter}
                                onStatusChange={setStatusFilter}
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                            />
                        </div>
                    </div>
                </div>

                {/* Add Task Button */}
                {tasks.length > 0 && (
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={handleAddTask}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <FaPlus />
                            <span>Add Task</span>
                        </button>
                    </div>
                )}

                {/* Content */}
                {isLoading && <Loader text="Loading tasks..." />}

                {error && (
                    <div className="text-center py-16">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchTasks}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!isLoading && !error && tasks.length === 0 && (
                    <EmptyState onAddTask={handleAddTask} />
                )}

                {!isLoading && !error && tasks.length > 0 && filteredAndSortedTasks.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">No tasks match your search criteria.</p>
                    </div>
                )}

                {!isLoading && !error && filteredAndSortedTasks.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteClick}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowTaskForm(false);
                        setEditingTask(null);
                    }}
                    isLoading={isFormLoading}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deletingTask && (
                <DeleteModal
                    task={deletingTask}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeletingTask(null)}
                    isLoading={isFormLoading}
                />
            )}
        </div>
    );
};

export default Home;
