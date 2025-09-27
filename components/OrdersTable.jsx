"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Edit, Trash2, Save, X } from "lucide-react"

const OrdersTable = () => {

    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [editingOrder, setEditingOrder] = useState(null)
    const [editValues, setEditValues] = useState({})
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/data/data.json")
                const data = await res.json()
                setOrders(data.orders)
            } catch (error) {
                console.error("Error fetching orders:", error)
            }
        }
        fetchOrders()
    }, [])

    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.total.toString().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.country.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Edit functions
    const handleEdit = (order) => {
        setEditingOrder(order.id)
        setEditValues({
            client: order.client,
            email: order.email,
            total: order.total,
            status: order.status,
            date: order.date,
            country: order.country
        })
    }

    const handleSave = (orderId) => {
        setOrders(orders.map(order => 
            order.id === orderId 
                ? { ...order, ...editValues }
                : order
        ))
        setEditingOrder(null)
        setEditValues({})
    }

    const handleCancel = () => {
        setEditingOrder(null)
        setEditValues({})
    }

    const handleInputChange = (field, value) => {
        setEditValues(prev => ({
            ...prev,
            [field]: field === 'total' ? parseFloat(value) || 0 : value
        }))
    }

    // Delete functions
    const handleDelete = (orderId) => {
        setDeleteConfirm(orderId)
    }

    const confirmDelete = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId))
        setDeleteConfirm(null)
    }

    const cancelDelete = () => {
        setDeleteConfirm(null)
    }

    // Status color function
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'text-green-400 bg-green-400/10'
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/10'
            case 'canceled':
                return 'text-red-400 bg-red-400/10'
            case 'processing':
                return 'text-blue-400 bg-blue-400/10'
            default:
                return 'text-gray-400 bg-gray-400/10'
        }
    }

    return (
        <>
            {/* Delete Confirmation Dialog */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div 
                        className="bg-[#1e1e1e] border border-[#1f1f1f] rounded-xl p-6 max-w-md mx-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold text-gray-100 mb-4">Confirm Delete</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete this order? This action cannot be undone.
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
                className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 mb-8">
                
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100 text-center sm:text-left">Orders</h2>
                    <div className="relative w-full sm:w-auto">
                        <input 
                            type="text" 
                            placeholder="Search Orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 
                            w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm" 
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-700">
                        <thead>
                            <tr>
                                {["Order ID", "Client", "Total", "Status", "Date", "Country", "Actions"].map(
                                    (header) => (
                                    <th key={header} 
                                    className="px-6 py-3 text-left text-xs font-medium
                                    text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-700">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                                        No orders found matching "{searchTerm}"
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order, index) => (
                                    <motion.tr key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    className="flex flex-col lg:table-row mb-4 lg:mb-0 border-b lg:border-b-0 border-gray-700 p-2 lg:p-0">

                                        {/* Mobile view */}
                                        <td className="lg:hidden px-3 py-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-100">
                                                        {editingOrder === order.id ? (
                                                            <input
                                                                type="text"
                                                                value={editValues.client || ''}
                                                                onChange={(e) => handleInputChange('client', e.target.value)}
                                                                className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                            />
                                                        ) : (
                                                            order.client
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        ID: {order.id}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {editingOrder === order.id ? (
                                                            <input
                                                                type="email"
                                                                value={editValues.email || ''}
                                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                                className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-40 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                            />
                                                        ) : (
                                                            order.email
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1 -mt-1 -mr-1">
                                                    {editingOrder === order.id ? (
                                                        <>
                                                            <button 
                                                                onClick={() => handleSave(order.id)}
                                                                className="flex items-center justify-center w-8 h-8 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                                                                title="Save changes"
                                                            >
                                                                <Save size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={handleCancel}
                                                                className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-300 hover:bg-gray-500/10 rounded-lg transition-colors"
                                                                title="Cancel"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleEdit(order)}
                                                            className="flex items-center justify-center w-8 h-8 text-indigo-500 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
                                                            title="Edit order"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => handleDelete(order.id)}
                                                        className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        title="Delete order"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-300">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span>Total: {editingOrder === order.id ? (
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            value={editValues.total || ''}
                                                            onChange={(e) => handleInputChange('total', e.target.value)}
                                                            className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-20 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                        />
                                                    ) : (
                                                        `$${order.total}`
                                                    )}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(editingOrder === order.id ? editValues.status : order.status)}`}>
                                                        {editingOrder === order.id ? (
                                                            <select
                                                                value={editValues.status || ''}
                                                                onChange={(e) => handleInputChange('status', e.target.value)}
                                                                className="bg-[#2f2f2f] text-white text-xs px-1 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                            >
                                                                <option value="Delivered">Delivered</option>
                                                                <option value="Pending">Pending</option>
                                                                <option value="Canceled">Canceled</option>
                                                                <option value="Processing">Processing</option>
                                                            </select>
                                                        ) : (
                                                            order.status
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Date: {editingOrder === order.id ? (
                                                        <input
                                                            type="text"
                                                            value={editValues.date || ''}
                                                            onChange={(e) => handleInputChange('date', e.target.value)}
                                                            className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-24 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                        />
                                                    ) : (
                                                        order.date
                                                    )}</span>
                                                    <span>Country: {editingOrder === order.id ? (
                                                        <input
                                                            type="text"
                                                            value={editValues.country || ''}
                                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                                            className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-20 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                        />
                                                    ) : (
                                                        order.country
                                                    )}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Desktop view */}
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                            {order.id}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <div>
                                                <div className="font-medium text-gray-100">
                                                    {editingOrder === order.id ? (
                                                        <input
                                                            type="text"
                                                            value={editValues.client || ''}
                                                            onChange={(e) => handleInputChange('client', e.target.value)}
                                                            className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-32 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                        />
                                                    ) : (
                                                        order.client
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {editingOrder === order.id ? (
                                                        <input
                                                            type="email"
                                                            value={editValues.email || ''}
                                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                                            className="bg-[#2f2f2f] text-white text-xs px-2 py-1 rounded w-48 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                        />
                                                    ) : (
                                                        order.email
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {editingOrder === order.id ? (
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={editValues.total || ''}
                                                    onChange={(e) => handleInputChange('total', e.target.value)}
                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-20 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                />
                                            ) : (
                                                `$${order.total}`
                                            )}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm">
                                            {editingOrder === order.id ? (
                                                <select
                                                    value={editValues.status || ''}
                                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                >
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Canceled">Canceled</option>
                                                    <option value="Processing">Processing</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            )}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {editingOrder === order.id ? (
                                                <input
                                                    type="text"
                                                    value={editValues.date || ''}
                                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-24 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                />
                                            ) : (
                                                order.date
                                            )}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {editingOrder === order.id ? (
                                                <input
                                                    type="text"
                                                    value={editValues.country || ''}
                                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                                    className="bg-[#2f2f2f] text-white text-sm px-2 py-1 rounded w-24 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                                />
                                            ) : (
                                                order.country
                                            )}
                                        </td>
                                        
                                        <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {editingOrder === order.id ? (
                                                    <>
                                                        <button 
                                                            onClick={() => handleSave(order.id)}
                                                            className="flex items-center justify-center w-8 h-8 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                                                            title="Save changes"
                                                        >
                                                            <Save size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={handleCancel}
                                                            className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-300 hover:bg-gray-500/10 rounded-lg transition-colors"
                                                            title="Cancel"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleEdit(order)}
                                                        className="flex items-center justify-center w-8 h-8 text-indigo-500 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
                                                        title="Edit order"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(order.id)}
                                                    className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete order"
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

export default OrdersTable
