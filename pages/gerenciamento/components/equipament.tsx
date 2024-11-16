import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlus } from "react-icons/fa";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Equipaments = {
    id: number,
    name: string,
    mark: string,
    SerialNumber: string
}

const PageEquipament: React.FC = () => {
    const [equipaments, setEquipaments] = useState<Equipaments[]>([])
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [newEquipament, setNewEquipaments] = useState({
        name: "",
        mark: "",
        SerialNumber: ""
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
                setNewEquipaments({ name: '', mark: "", SerialNumber: '' })
                setIsCardVisible(false);
                viewEquipaments();

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
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Nome</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Marca</th>
                            <th className="py-4 px-6 border-b border-gray-600 text-center">Número de série</th>
                            <th className="border-b border-gray-600">
                                <button
                                    type="button"
                                    onClick={() => setIsCardVisible(true)}
                                    className="bg-green-800 rounded p-2"
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Equipamento
                                </button>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipaments.map((equipaments) => (
                            <tr key={equipaments.id}>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{equipaments.name}</td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{equipaments.mark}</td>
                                <td className="py-4 px-6 border-b border-gray-600 text-center">{equipaments.SerialNumber}</td>
                                <td className="border-b border-gray-600"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isCardVisible && (
                    <div className="w-full flex p-4 justify-center mx-auto">
                        <div className="w-1/3 p-4 flex flex-col items-center bg-purple-200 rounded">
                            <h1 className="text-black mb-4">Novo equipamento</h1>
                            <div>
                                <label htmlFor="" className="text-black block">Nome:</label>
                                <input
                                    type="text"
                                    id="equipament-name"
                                    value={newEquipament.name}
                                    onChange={(e) => setNewEquipaments({ ...newEquipament, name: e.target.value })}
                                    placeholder="Nome do equipamento:"
                                    className="text-gray-700"
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
                                    className="text-gray-700"

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
                                    className="text-gray-700"

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