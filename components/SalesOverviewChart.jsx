"use client"

import React, { useEffect, useState } from 'react'

const SalesOverviewChart = () => {

    const [salesData, setSalesData] = useState([])

    useEffect(() => {
       fetch("data/data.json")
       .then((res) => res.json())
       .then((data) => setSalesData(data.sales))
    }, [])
  return (
    <div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] 
    mx-2 md:mx-0'>
        <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>
            Sales Overview
        </h2>
      
    </div>
  )
}

export default SalesOverviewChart
