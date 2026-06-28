// Utility functions for Task Tracker

// Format date for display
export const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Format date for input field
export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

// Check if a date is overdue
export const isOverdue = (dateString, status) => {
    if (!dateString || status === 'completed') return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
};

// Get status badge color classes
export const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-amber-100 text-amber-800';
        case 'in-progress':
            return 'bg-blue-100 text-blue-800';
        case 'completed':
            return 'bg-emerald-100 text-emerald-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Get status display text
export const getStatusText = (status) => {
    switch (status) {
        case 'pending':
            return 'Pending';
        case 'in-progress':
            return 'In Progress';
        case 'completed':
            return 'Completed';
        default:
            return status;
    }
};

// Sort options
export const SORT_OPTIONS = [
    { value: 'dueDate-asc', label: 'Due Date (Earliest)' },
    { value: 'dueDate-desc', label: 'Due Date (Latest)' },
    { value: 'createdAt-desc', label: 'Created Date (Newest)' },
    { value: 'createdAt-asc', label: 'Created Date (Oldest)' },
];

// Status options for filtering
export const STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
];
