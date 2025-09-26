'use client'

import React from 'react'
import Image from 'next/image'
import uk from '../public/Images/uk.png'
import { Bell } from 'lucide-react'
import admin  from '../public/Images/admin.jpg'
import { useTheme } from '@/contexts/ThemeContext'


const Header = () => {
  const { isLight } = useTheme()
  
  return (
    <header className={`shadow-lg border-b mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg ${
        isLight 
            ? 'bg-white border-gray-200' 
            : 'bg-[#1e1e1e] border-[#1f1f1f]'
    }`}>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between'>
            <h1 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${
                isLight ? 'text-gray-900' : 'text-gray-100'
            }`}>Dashboard</h1>
          

          <div className='flex items-center space-x-3 sm:space-x-6'>
            <Image src={uk} alt='uk' width={25} height={18} className="rounded-full shadow-md cursor-pointer" />
            
            <div className='relative'>
                <Bell className={`w-5 sm:w-6 h-5 sm:h-6 cursor-pointer ${
                    isLight 
                        ? 'text-gray-600 hover:text-gray-900' 
                        : 'text-gray-300 hover:text-white'
                }`}/>
            </div>

                <div className='flex items-center space-x-2 sm:space-x-3'>
                    <Image src={admin} alt='admin' width={35} height={35} className={`rounded-full ${
                        isLight ? 'border-gray-300' : 'border-gray-600'
                    }`}/>

                    <span className={`hidden sm:block font-medium ${
                        isLight ? 'text-gray-900' : 'text-gray-100'
                    }`}>
                        John Mark
                    </span>
                </div>
            
          </div>
        </div>

    </header>
  )
}

export default Header
