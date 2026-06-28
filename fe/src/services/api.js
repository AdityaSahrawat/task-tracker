// API service for Task Tracker
// Connects to the Express + MongoDB backend using fetch

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Map database format to frontend representation
const mapToFrontend = (task) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    // Backend status enum: ["Pending", "In Progress", "Completed"]
    // Frontend status options: ["pending", "in-progress", "completed"]
    status: task.status === 'In Progress' ? 'in-progress' : (task.status === 'Completed' ? 'completed' : 'pending'),
    dueDate: task.dueDate,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
});

// Map frontend format to backend representation
const mapToBackend = (taskData) => {
    const backendTask = {
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate || null,
    };
    if (taskData.status) {
        backendTask.status = taskData.status === 'in-progress' ? 'In Progress' : (taskData.status === 'completed' ? 'Completed' : 'Pending');
    }
    return backendTask;
};

// Get all tasks
export const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch tasks');
    }
    const tasks = await response.json();
    return tasks.map(mapToFrontend);
};

// Create a new task
export const createTask = async (taskData) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapToBackend(taskData)),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create task');
    }
    const task = await response.json();
    return mapToFrontend(task);
};

// Update an existing task
export const updateTask = async (id, taskData) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapToBackend(taskData)),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update task');
    }
    const task = await response.json();
    return mapToFrontend(task);
};

// Delete a task
export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete task');
    }
    return { success: true };
};
