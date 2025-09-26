'use client'

import { DollarSign, House, Info, Mail, Settings, ShoppingBag, ShoppingCart, Users, Bell, Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'


const ICONS = {
    House,
    DollarSign,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Mail,
    Users,
    Bell,
    Info
}

const Sidebar = () => {
    const [isSidebarOpen,setIssidebarOpen] = useState(true)
    const { isLight } = useTheme()

    const [sidebarItems, setSidebarItems] = useState([])
    const pathname = usePathname()

    useEffect(() => {
        fetch("/data/data.json").then((res) => res.json()).then((data) => setSidebarItems(data.sidebarItems))
    }, [])
  return (
    <div className={`relative z-[100] transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20' }`}>
       <div className={`h-full backdrop-blur-md p-4 flex flex-col border-r ${
           isLight 
               ? 'bg-white border-gray-200' 
               : 'bg-[#1e1e1e] border-[#2f2f2f]'
       }`}>

        <button onClick={() => setIssidebarOpen(!isSidebarOpen)} className={`p-2 rounded-full transition-colors max-w-fit cursor-pointer ${
            isLight 
                ? 'hover:bg-gray-100 text-gray-700' 
                : 'hover:bg-[#2f2f2f] text-white'
        }`}>
            {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
        <nav className='mt-8 flex-grow'>
            {sidebarItems.map((item) => {
                const IconComponent = ICONS[item.icon]
                return (
                    <Link key={item.name} href={item.href}>
                        <div className={`group relative flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${
                            isLight 
                                ? `hover:bg-gray-100 ${pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-700"}` 
                                : `hover:bg-[#2f2f2f] ${pathname === item.href ? "bg-[#2f2f2f] text-white" : "text-gray-300"}`
                        }`}>
                            <IconComponent size={20} style={{ minWidth: "20px" }}/>
                           {isSidebarOpen && (
                            <span className='ml-4 whitespace-nowrap'>{item.name}</span>
                           )}
                            {/* Tooltip for when sidebar is closed */}
                            {!isSidebarOpen && (
                                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-xl border min-w-max ${
                                    isLight 
                                        ? 'bg-white text-gray-900 border-gray-200' 
                                        : 'bg-[#1a1a1a] text-white border-[#333]'
                                }`}>
                                    {item.name}
                                    {/* Arrow pointing down to the icon */}
                                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent ${
                                        isLight ? 'border-t-white' : 'border-t-[#1a1a1a]'
                                    }`}></div>
                                </div>
                            )}
                        </div>
                    </Link>
                )
            })}
        </nav>
       </div>
    </div>
  )
}

export default Sidebar
