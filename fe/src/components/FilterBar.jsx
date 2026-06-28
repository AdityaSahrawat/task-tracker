//
import { FaFilter, FaSort } from 'react-icons/fa';
import { STATUS_OPTIONS, SORT_OPTIONS } from '../utils/helpers';

const FilterBar = ({ statusFilter, onStatusChange, sortBy, onSortChange }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                >
                    {STATUS_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1 relative">
                <FaSort className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                >
                    {SORT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
