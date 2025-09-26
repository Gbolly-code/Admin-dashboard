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
    <div className={`relative z-[100] transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20' }`}>
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
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#1a1a1a] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-xl border border-[#333] min-w-max">
                                    {item.name}
                                    {/* Arrow pointing down to the icon */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#1a1a1a]"></div>
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
