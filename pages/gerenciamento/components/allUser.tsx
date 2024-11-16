import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./sidebar";
import { FaEdit, FaFontAwesome, FaTrash } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


type User = {
    id: number
    name: string
    email: string
    userType: number
}

const PageAdmin: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const viewUser = async () => {
        try {
            const response = await fetch('/api/user/getAllUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
            } else {
                setUsers(data);
            }
        } catch (error) {
            toast.error('Algo deu errado');
        }
    };

    useEffect(() => {
        viewUser();
        console.log('USUÁRIOS', viewUser);
    }, []);

    const getUserTypeName = (userType: number): string => {
        switch (userType) {
            case 1:
                return 'Administrador';
            case 2:
                return 'Técnico';
            case 3:
                return 'Usuário';
            default:
                return 'Desconhecido';
        }
    };

    return (
        <div className="flex bg-gray-700 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-8 text-white">
                <ToastContainer />
                <h1 className="text-3xl font-semibold mb-6 flex justify-center">Usuários</h1>
                <table className="w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Nome</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Email</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Tipo de usuário</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center"></th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center"></th>


                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{user.name}</td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{user.email}</td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">
                                    {getUserTypeName(user.userType)}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">
                                    <button
                                        type="button"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">
                                    <button
                                        type="button"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default PageAdmin;
