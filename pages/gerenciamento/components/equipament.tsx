import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlus } from "react-icons/fa";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { json } from "stream/consumers";

type Equipaments = {
    id: number,
    name: string,
    mark: string,
    SerialNumber: string,
    type: string
}

const PageEquipament: React.FC = () => {
    const [equipaments, setEquipaments] = useState<Equipaments[]>([])
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [newEquipament, setNewEquipaments] = useState({
        name: "",
        mark: "",
        SerialNumber: "",
        type: ""
    })


    const viewEquipaments = async () => {
        try {
            const response = await fetch('/api/user/equipaments/getAllEquipament', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message)
            } else (
                setEquipaments(data.message)
            )

        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const handleCreateEquipament = async () => {
        try {
            const response = await fetch('/api/user/equipaments/createEquipament', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newEquipament)
            })
            const data = await response.json()


            if (!response.ok) {
                toast.error(data.message)
            } else {
                toast.success('Equipamento cadastrado com sucesso')
                setNewEquipaments({ name: '', mark: "", SerialNumber: '', type: '' })
                setIsCardVisible(false);
                viewEquipaments();

            }

        } catch (error) {
            toast.error(500)
        }
    }


    const deleteEquipament = async (id: number) => {
        try {
            const response = await fetch('/api/user/equipaments/deleteEquipament', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message)
            } else {
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(500)
        }
    }


    useEffect(() => {
        viewEquipaments();
    }, []);


    return (
        <div className="bg-gray-700 flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <ToastContainer />
                <h1 className="text-3xl flex justify-center mx-auto mt-6"><strong>EQUIPAMENTOS</strong></h1>
                <br />
                <table className="w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Tipo</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Nome</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Marca</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Número de série</th>
                            <th className="border-b border-gray-600">
                                <button
                                    type="button"
                                    onClick={() => setIsCardVisible(true)}
                                    className="relative bg-green-800 rounded p-2 text-white font-semibold overflow-hidden group "
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-400 ease-in-out transform scale-x-0 group-hover:scale-x-150 origin-left"></span>
                                    <span className="relative z-10 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faPlus} /> Equipamento
                                    </span>
                                </button>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipaments.map((equipaments) => (
                            <tr key={equipaments.id}>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{equipaments.type}</td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{equipaments.name}</td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{equipaments.mark}</td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{equipaments.SerialNumber}</td>
                                <td className="border-b border-gray-600">
                                    <button
                                        type="button"
                                        onClick={() => deleteEquipament(equipaments.id)}
                                        className="group p-2"
                                    >
                                        <FontAwesomeIcon icon={faTrash}
                                            className="text-gray-600 group-hover:text-red-600 transition-colors duration-300" />

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isCardVisible && (
                    <div className="w-full flex p-4 justify-center mx-auto">
                        <div className="w-1/3 p-4 flex flex-col items-center bg-purple-200 rounded">
                            <h1 className="text-black mb-4">Novo equipamento</h1>

                            <div>
                                <label htmlFor="" className="text-black block">Tipo de Equipamento</label>
                                <select
                                    name="equipamentType"
                                    id="equipamentType"
                                    value={newEquipament.type}
                                    onChange={(e) => setNewEquipaments({ ...newEquipament, type: e.target.value })}
                                    className="text-gray-700"
                                >
                                    <option value="" disabled>Selecione o tipo</option>
                                    <option value="Celular">Celular</option>
                                    <option value="Impressora">Impressora</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Computador">Computador</option>
                                    <option value="Monitor">Monitor</option>

                                </select>
                            </div>

                            <div>
                                <label htmlFor="" className="text-black block">Nome:</label>
                                <input
                                    type="text"
                                    id="equipament-name"
                                    value={newEquipament.name}
                                    onChange={(e) => setNewEquipaments({ ...newEquipament, name: e.target.value })}
                                    placeholder="Nome do equipamento:"
                                    className="text-gray-700 rounded"
                                />
                            </div>

                            <div>
                                <label htmlFor="" className="text-black block">Marca:</label>
                                <input
                                    type="text"
                                    id="equipament-mark"
                                    value={newEquipament.mark}
                                    onChange={(e) => setNewEquipaments({ ...newEquipament, mark: e.target.value })}
                                    placeholder="marca do equipamento:"
                                    className="text-gray-700 rounded"

                                />
                            </div>
                            <div>
                                <label htmlFor="" className="text-black block">Número de Série</label>
                                <input
                                    type="text"
                                    id="equipament-SerialNumber"
                                    value={newEquipament.SerialNumber}
                                    onChange={(e) => setNewEquipaments({ ...newEquipament, SerialNumber: e.target.value })}
                                    placeholder="Nome do equipamento:"
                                    className="text-gray-700 rounded"

                                />
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIsCardVisible(false)}
                                    className="mr-6 bg-red-700 p-2 rounded"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCreateEquipament}
                                    className="bg-green-700 p-2 mt-4 rounded"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default PageEquipament;