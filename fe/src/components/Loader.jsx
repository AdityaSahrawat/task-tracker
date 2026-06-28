const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-600 mb-4"></div>
            <p className="text-gray-500 text-sm font-medium">{text}</p>
        </div>
    );
};

export default Loader;
