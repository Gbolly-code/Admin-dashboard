'use client'

import { DollarSign, House, Info, Mail, Settings, ShoppingBag, ShoppingCart, Users, Bell, Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'


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
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
    const [sidebarItems, setSidebarItems] = useState([])
    const pathname = usePathname()

    useEffect(() => {
        fetch("/data/data.json").then((res) => res.json()).then((data) => setSidebarItems(data.sidebarItems))
    }, [])
  return (
    <div className={`relative z-[100] transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20' }`}>
       <div className='h-full bg-[#1e1e1e] backdrop-blur-md flex flex-col border-r border-[#2f2f2f]'>
        
        {/* Fixed Toggle Button at Top */}
        <div className='sticky top-0 z-10 bg-[#1e1e1e] border-b border-[#2f2f2f] p-4'>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className='p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer'
          >
              {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>


        {isSidebarOpen && (
          <nav className='mt-4 flex-grow p-4'>
              {sidebarItems.map((item) => {
                  const IconComponent = ICONS[item.icon]
                  return (
                      <Link key={item.name} href={item.href}>
                          <div className={`group relative flex flex-col items-center p-3 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 
                          ${pathname === item.href ? "bg-[#2f2f2f]" : ""}`}>
                              <IconComponent size={20} style={{ minWidth: "20px" }}/>
                              <span className='mt-2 text-xs text-center whitespace-nowrap'>{item.name}</span>
                          </div>
                      </Link>
                  )
              })}
          </nav>
        )}
       </div>
    </div>
  )
}

export default Sidebar
