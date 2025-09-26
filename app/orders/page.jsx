"use client"

import StatCard from "@/components/StatCard"
import OrdersTable from "@/components/OrdersTable"
import { motion } from "framer-motion"
import { ShoppingBag, CheckCircle, Clock, Ban } from "lucide-react"
import React from "react"
import { useTheme } from "@/contexts/ThemeContext"

const OrdersPage = () => {
    const { isLight } = useTheme()
    
    return (
        <div className={`flex-1 overflow-auto relative z-10 ${
            isLight ? 'bg-gray-50' : 'bg-[#121212]'
        }`}>
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatCard name="Total Orders" icon={ShoppingBag} value={"15,240"} />
                    <StatCard name="Completed Orders" icon={CheckCircle} value={"13,500"} />
                    <StatCard name="Pending Orders" icon={Clock} value={"1,120"} />
                    <StatCard name="Canceled Orders" icon={Ban} value={"620"} />
                </motion.div>

                <OrdersTable />
            </main>
        </div>
    )
}

export default OrdersPage
