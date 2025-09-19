"use client"

import React, { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'

const COLORS = ["#FF6B6B", "#4D96FF", "#FFD166", "#06D6A0", "#A29BFE"]

const OrderDistributionChart = () => {

    const [orderStatusData, setOrderStatusData] = useState([])

    useEffect(() => {
        fetch("/data/data.json")
        .then((res) => res.json())
        .then((data) => setOrderStatusData(data.orderStatusData))
    }, [])
  return (
    <motion.div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl
    p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}>
      <h2 className='text-base md:text-xl font-semibold text-gray-100 mb-4 text-center md:text-left'>
        Order Status Distribution</h2>
        <div className='w-full h-64 md:h-80'>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={orderStatusData} 
                    cx="50%" cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({name, percent }) => 
                    `${name} ${(percent * 100)
                        .toFixed(0)}%
                    `}
                    labelLine={{ stroke: "#9ca3af" }}>
                        {orderStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{
                        backgroundColor: "rgba(31, 41, 55, 0.8)",
                        borderColor: "#4b5563",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "12px",
                    }}  itemStyle={{ color: "#e5e7eb" }}
                        cursor={{fill: "rgba(255, 255, 255, 0.1)"}} />
                        <Legend iconType="circle" 
                        layout="horizontal"
                        align="center"
                        wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </motion.div>
  )
}

export default OrderDistributionChart
