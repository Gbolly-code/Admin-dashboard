"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

const UsersTable = () => {

    const [clients, setClients] = useState([])

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


    return (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }} 
        className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 mb-8 ">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-100 text-center sm:text-left">Clients</h2>
                <div className="relative w-full sm:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search Clients..."
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
                            {["Name", "Email", "Phone Numbers", "Country", "Actions"].map(
                                (header) => (
                                <th key={header} 
                                className="px-6 py-3 text-left text-xs font-medium
                                text-gray-400 uppercase tracking-wider hidden md:table-cell">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
        </motion.div>
    )
}

export default UsersTable