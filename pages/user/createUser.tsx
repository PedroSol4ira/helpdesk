import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function CreateUser() {
    // Definindo estados para os campos
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("usuario");  // Valor padrão é "usuario"

    // Função para lidar com o envio do formulário
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault(); // Previne o comportamento padrão de envio do formulário

        const userData = {
            name,
            email,
            password,
            userType,
        };

        try {
            const response = await fetch("./api/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Cadastro concluido com sucesso")
            } else {
                const errorData = await response.json();
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    }

    return (
        <div className="border w-1/2 flex flex-col justify-center">
            <ToastContainer />
            <h1>Cadastrar usuário</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex justify-center">
                    <label htmlFor="userType" className="p-6">
                        Tipo de usuário:
                        <select
                            id="userType"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="text-black"
                        >
                            <option value="administrador">Administrador</option>
                            <option value="tecnico">Técnico</option>
                            <option value="usuario">Usuário</option>
                        </select>
                    </label>
                </div>

                <div className="flex justify-center">
                    <label htmlFor="name">
                        Nome:
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block text-black"
                        />
                    </label>
                </div>

                <div className="flex justify-center">
                    <label htmlFor="email">
                        Email:
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block text-black"
                        />
                    </label>
                </div>

                <div className="flex justify-center">
                    <label htmlFor="password">
                        Senha:
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block text-black"
                        />
                    </label>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="p-4 bg-blue-500 text-white">
                        Criar Usuário
                    </button>
                </div>
            </form>
        </div>
    );
}
