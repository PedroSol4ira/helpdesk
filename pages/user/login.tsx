import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const userData = { email, password, };

        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Ocorreu um erro", error);
            toast.error("Erro inesperado. Tente novamente.");
        }
    }

    return (
        <div className="border w-1/4 flex flex-col justify-center mx-auto bg-gray-700 rounded-xl ">
            <ToastContainer />

            <h1 className="flex justify-center p-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 backdrop-blur-sm">

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

                <div className="">
                    <button
                        type="button"
                        onClick={() => Router.push('/user/createUser')}
                        className="text-blue-500 flex mx-auto"
                    >
                        Cadastre-se
                    </button>
                </div>

                <div className="flex justify-center p-2">
                    <button type="submit" className="p-4 bg-green-500 text-white rounded">
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    );
}
