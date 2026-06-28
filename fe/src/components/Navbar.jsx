import { FaTasks } from 'react-icons/fa';

const Navbar = () => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <FaTasks className="text-blue-600 text-2xl" />
                        <h1 className="text-xl font-semibold text-gray-900">Task Tracker</h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
