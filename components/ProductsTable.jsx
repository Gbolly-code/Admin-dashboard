"use client"

import React, { useState } from 'react'
import productData from "../public/data/data.json"
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'


const ProductsTable = () => {

    const [products, setProducts] = useState(productData.products)

  return (
    <motion.div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl
    p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0
    mb-8'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}>
        <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 
        md:gap-0'>
            <h2 className='text-lg md:text-xl font-semibold text-gray-100 text-center 
            md:text-left'>Products List</h2>
            <div className='relative w-full md:w-auto'>
                <input type="text" placeholder='Search Products...' className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full
                md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'/>
                <Search className='absolute left-3 top-2.5 text-gray-400' size={18}/>
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-gray-700'>
                        <thead>
                            <tr>
                                {[
                                    "Name",
                                    "Product ID",
                                    "Category",
                                    "Price",
                                    "Stock",
                                    "Sales",
                                    "Actions",
                                ].map((header) => (
                                    <th key={header} className='px-1 md:px-6 py-2 md:py-3 text-left text-xs font-medium
                                    text-gray-400 uppercase tracking-wider hidden md:table-cell'>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
      
    </motion.div>
  )
}

export default ProductsTable
