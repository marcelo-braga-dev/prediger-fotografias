import ApplicationLogo from '@/Components/Excluir/ApplicationLogo.jsx';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center sm:pt-0 bg-gray-100">
            <div className="bg-dark p-2 rounded mt-5">
                <img src="/storage/app/logo.png" alt="logo" width="250"/>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
