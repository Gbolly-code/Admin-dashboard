"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Edit, Trash2, Save, X } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"

const UsersTable = () => {
    const { isLight } = useTheme()

    const [clients, setClients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [editingClient, setEditingClient] = useState(null)
    const [editValues, setEditValues] = useState({})
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch("/data/data.json")
                const data = await res.json()
                setClients(data.clients)
            } catch (error) {
                console.error("Error fetching clients:", error)
            }
        }
        fetchClients()
    }, [])

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.country.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Edit functions
    const handleEdit = (client) => {
        setEditingClient(client.id)
        setEditValues({
            name: client.name,
            email: client.email,
            phoneNumber: client.phoneNumber,
            country: client.country
        })
    }

    const handleSave = (clientId) => {
        setClients(clients.map(client => 
            client.id === clientId 
                ? { ...client, ...editValues }
                : client
        ))
        setEditingClient(null)
        setEditValues({})
    }

    const handleCancel = () => {
        setEditingClient(null)
        setEditValues({})
    }

    const handleInputChange = (field, value) => {
        setEditValues(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // Delete functions
    const handleDelete = (clientId) => {
        setDeleteConfirm(clientId)
    }

    const confirmDelete = (clientId) => {
        setClients(clients.filter(client => client.id !== clientId))
        setDeleteConfirm(null)
    }

    const cancelDelete = () => {
        setDeleteConfirm(null)
    }

    return (
        <>
            {/* Delete Confirmation Dialog */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div 
                        className={`border rounded-xl p-6 max-w-md mx-4 ${
                            isLight 
                                ? 'bg-white border-gray-200' 
                                : 'bg-[#1e1e1e] border-[#1f1f1f]'
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className={`text-lg font-semibold mb-4 ${
                            isLight ? 'text-gray-900' : 'text-gray-100'
                        }`}>Confirm Delete</h3>
                        <p className={`mb-6 ${
                            isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            Are you sure you want to delete this client? This action cannot be undone.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => confirmDelete(deleteConfirm)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }} 
                className={`backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border mx-2 md:mx-0 mb-8 ${
                    isLight 
                        ? 'bg-white border-gray-200' 
                        : 'bg-[#1e1e1e] border-[#1f1f1f]'
                }`}>
                
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                    <h2 className={`text-lg sm:text-xl font-semibold text-center sm:text-left ${
                        isLight ? 'text-gray-900' : 'text-gray-100'
                    }`}>Clients</h2>
                <div className="relative w-full sm:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search Clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm ${
                                isLight 
                                    ? 'bg-white text-gray-900 placeholder-gray-500 border border-gray-300' 
                                    : 'bg-[#2f2f2f] text-white placeholder-gray-400'
                            }`} 
                        />
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                            isLight ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                    </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-gray-700">
                    <thead>
                        <tr>
                            {["Name", "Email", "Phone Numbers", "Country", "Actions"].map(
                                (header) => (
                                <th key={header} 
                                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell ${
                                        isLight ? 'text-gray-600' : 'text-gray-400'
                                    }`}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className={`px-6 py-8 text-center ${
                                        isLight ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                        No clients found matching "{searchTerm}"
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map((client, index) => (
                            <motion.tr key={client.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    className="flex flex-col lg:table-row mb-4 lg:mb-0 border-b lg:border-b-0 border-gray-700 p-2 lg:p-0">

                                        {/* Mobile view */}
                                        <td className="lg:hidden px-3 py-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Image 
                                                        src={client.image} 
                                                        alt={client.name} 
                                                        width={36}
                                                        height={36}
                                                        className="w-9 h-9 rounded-full"
                                                    />
                                                    <div className="ml-3">
                                                        <div className={`text-sm font-medium ${
                                                            isLight ? 'text-gray-900' : 'text-gray-100'
                                                        }`}>
                                                            {editingClient === client.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editValues.name || ''}
                                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                                />
                                                            ) : (
                                                                client.name
                                                            )}
                                                        </div>
                                                        <div className={`text-xs ${
                                                            isLight ? 'text-gray-500' : 'text-gray-400'
                                                        }`}>
                                                            {editingClient === client.id ? (
                                                                <input
                                                                    type="email"
                                                                    value={editValues.email || ''}
                                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                                    className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-40 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                                />
                                                            ) : (
                                                                client.email
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-1 -mt-1 -mr-1">
                                                    {editingClient === client.id ? (
                                                        <>
                                                            <button 
                                                                onClick={() => handleSave(client.id)}
                                                                className="text-green-500 hover:text-green-300"
                                                            >
                                                                <Save size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={handleCancel}
                                                                className="text-gray-500 hover:text-gray-300"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleEdit(client)}
                                                            className="text-indigo-500 hover:text-indigo-300"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => handleDelete(client.id)}
                                                        className="text-red-500 hover:text-red-300"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-300">
                                                <div>
                                                    Phone: {editingClient === client.id ? (
                                                        <input
                                                            type="text"
                                                            value={editValues.phoneNumber || ''}
                                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                            className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                        />
                                                    ) : (
                                                        client.phoneNumber
                                                    )}
                                                </div>
                                                <div>
                                                    Country: {editingClient === client.id ? (
                                                        <input
                                                            type="text"
                                                            value={editValues.country || ''}
                                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                                            className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                        />
                                                    ) : (
                                                        client.country
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Desktop view */}
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                            <div className="flex items-center">
                                                <Image 
                                                    src={client.image} 
                                                    alt={client.name} 
                                                    width={40}
                                                    height={40}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-100">
                                                        {editingClient === client.id ? (
                                                            <input
                                                                type="text"
                                                                value={editValues.name || ''}
                                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                                className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                            />
                                                        ) : (
                                                            client.name
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {editingClient === client.id ? (
                                                <input
                                                    type="email"
                                                    value={editValues.email || ''}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-48 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                />
                                            ) : (
                                                client.email
                                            )}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {editingClient === client.id ? (
                                                <input
                                                    type="text"
                                                    value={editValues.phoneNumber || ''}
                                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                />
                                            ) : (
                                                client.phoneNumber
                                            )}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {editingClient === client.id ? (
                                                <input
                                                    type="text"
                                                    value={editValues.country || ''}
                                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                />
                                            ) : (
                                                client.country
                                            )}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {editingClient === client.id ? (
                                                    <>
                                                        <button 
                                                            onClick={() => handleSave(client.id)}
                                                            className="text-green-500 hover:text-green-300"
                                                        >
                                                            <Save size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={handleCancel}
                                                            className="text-gray-500 hover:text-gray-300"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleEdit(client)}
                                                        className="text-indigo-500 hover:text-indigo-300"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(client.id)}
                                                    className="text-red-500 hover:text-red-300"
                                                >
                                                    <Trash2 size={16}/>
                                                </button>
                                            </div>
                                </td>
                            </motion.tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>
        </motion.div>
        </>
    )
}

export default UsersTable
