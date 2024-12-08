import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="bg-white shadow-md py-4 px-6 mb-1">
            <div className="mx-auto flex justify-between items-center">
                <div className="text-blue-700 font-bold text-xl">P-LIB</div>
                <div className="flex items-center gap-4">
                    <div className="text-gray-700 text-sm">Hello, {user.username}</div>
                    <button
                        onClick={handleLogout}
                        className="text-red-600 text-sm hover:text-red-800"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;