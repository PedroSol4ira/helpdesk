import { Router, useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreateUser() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const userData = {
            name,
            email,
            password,
            userType,
        };

        try {
            const response = await fetch("/api/user/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Cadastro concluído com sucesso");

            } else {
                const errorData = await response.json();
                toast.error("Erro ao cadastrar usuário");
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    }

    return (
        <div className="border flex flex-col justify-center min-h-screen bg-no-repeat bg-cover bg-center" style={{
            backgroundImage: 'url("/images/imagem2.jpeg")'
        }}>
            <ToastContainer />

            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 bg-gray-200 w-1/4 mx-auto rounded-xl ">
                <h1
                    className="flex justify-center text-gray-700 mt-4">
                    Cadastrar usuário</h1>
                <div className="flex justify-center text-black p-2">
                    <label htmlFor="userType" className="mt-4">
                        Tipo de usuário:
                        <select
                            id="userType"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="text-black ml-2 p-1 rounded bg-yellow-300"
                        >
                            <option value="usuario">Usuário</option>
                            <option value="administrador">Administrador</option>
                            <option value="tecnico">Técnico</option>

                        </select>
                    </label>
                </div>

                <div className="flex justify-center text-gray-700 ">
                    <label htmlFor="name">
                        Nome:
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block text-black border border-gray-700 h-8 rounded"
                            placeholder=" Nome de usuário"
                        />
                    </label>
                </div>

                <div className="flex justify-center text-gray-700">
                    <label htmlFor="email">
                        Email:
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block text-black border border-gray-700 h-8 rounded"
                            placeholder=" Ex: SeuEmail@email.com"
                        />
                    </label>
                </div>

                <div className="flex justify-center text-gray-700">
                    <label htmlFor="password">
                        Senha:
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block text-black border border-gray-700 h-8 rounded"
                            placeholder="*********"
                        />
                    </label>
                </div>

                <div className="flex justify-center mb-6">
                    <button type="submit" className="p-4 bg-green-500 text-white rounded">
                        Criar Usuário
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="p-2 mb-6 text-white flex mx-auto bg-blue-700 rounded "
                    > Ja tenho conta</button>
                </div>
            </form>

        </div>
    );
}
