"use client"

import React, { useEffect, useState } from 'react'
import { ResponsiveContainer } from 'recharts'

const COLORS = ["#FF6B6B", "#4D96FF", "#FFD166", "#06D6A0", "#A29BFE"]

const OrderDistributionChart = () => {

    const [orderStatusData, setOrderStatusData] = useState([])

    useEffect(() => {
        fetch("/data/data.json")
        .then((res) => res.json())
        .then((data) => setOrderStatusData(data.orderStatusData))
    }, [])
  return (
    <div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl
    p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 '>
      <h2 className='text-base md:text-xl font-semibold text-gray-100 mb-4 text-center md:text-left'>
        Order Status Distribution</h2>
        <div className='w-full h-64 md:h-80'>
            <ResponsiveContainer>
                
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default OrderDistributionChart
