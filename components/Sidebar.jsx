'use client'

import { DollarSign, House, Info, Mail, Settings, ShoppingBag, ShoppingCart, Users, Bell, Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


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

    const [sidebarItems, setSidebarItems] = useState([])
    const pathname = usePathname()

    useEffect(() => {
        fetch("/data/data.json").then((res) => res.json()).then((data) => setSidebarItems(data.sidebarItems))
    }, [])
  return (
    <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20' }`}>
       <div className='h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]'>

        <button onClick={() => setIssidebarOpen(!isSidebarOpen)} className='p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer'>
            {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
        <nav className='mt-8 flex-grow'>
            {sidebarItems.map((item) => {
                const IconComponent = ICONS[item.icon]
                return (
                    <Link key={item.name} href={item.href}>
                        <div className={`group relative flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 
                        ${pathname === item.href ? "bg-[#2f2f2f]" : ""}`}>
                            <IconComponent size={20} style={{ minWidth: "20px" }}/>
                           {isSidebarOpen && (
                            <span className='ml-4 whitespace-nowrap'>{item.name}</span>
                           )}
                            {/* Tooltip for when sidebar is closed */}
                            {!isSidebarOpen && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-[#2f2f2f] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    {item.name}
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
