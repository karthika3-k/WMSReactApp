import { FaSpinner } from "react-icons/fa";

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-indigo-100">
            <FaSpinner color="#4A90E2" size={40} />
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
    );
};
export default Loader;