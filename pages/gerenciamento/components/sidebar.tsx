import React, { useState } from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <button
                className="md:hidden p-4"
                onClick={toggleSidebar}
            >
                {isOpen ? 'Fechar' : 'Abrir'}
            </button>

            <div
                className={`${isOpen ? 'w-64' : 'w-0'
                    } bg-gray-800 text-white h-screen overflow-hidden transition-all duration-300`}
            >
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold my-4">Menu</h2>
                    <ul className="w-full">
                        <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                            <FaHome className="mr-3" />
                            <span>Início</span>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                            <FaUser className="mr-3" />
                            <span>Perfil</span>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                            <FaCog className="mr-3" />
                            <span>Configurações</span>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                            <FaCog className='mr-3' />
                            <a href="/gerenciamento/components/allUser">Gerenciamento de usuários</a>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Sidebar;
