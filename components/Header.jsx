"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import uk from '../public/Images/uk.png'
import { Bell, Search, Settings, LogOut, User } from 'lucide-react'
import admin  from '../public/Images/admin.jpg'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/contexts/SidebarContext'


const Header = () => {
  const { isSidebarOpen } = useSidebar()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const notifications = [
    { id: 1, title: "New order received", message: "Order #A7B9D31 from Ethan Carter", time: "2 min ago", unread: true },
    { id: 2, title: "Low stock alert", message: "Mouse inventory is running low", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment received", message: "$632.00 payment from Sophia Mitchell", time: "3 hours ago", unread: false },
    { id: 4, title: "New client registered", message: "Liam Harrison joined the platform", time: "5 hours ago", unread: false }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e]/90 backdrop-blur-md shadow-lg border-b border-[#1f1f1f]'>
        <div className={`mx-auto py-4 px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} max-w-7xl`}>
            <h1 className={`text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100 transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}>Dashboard</h1>
          
          <div className='flex items-center space-x-3 sm:space-x-6'>
            {/* Search Bar */}
            <div className='relative hidden md:block'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
                />
              </div>
            </div>

            {/* Language Selector */}
            <Image src={uk} alt='uk' width={25} height={18} className="rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform" />
            
            {/* Notifications */}
            <div className='relative'>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className='relative p-2 rounded-full hover:bg-[#2f2f2f] transition-colors'
                >
                  <Bell className='w-5 sm:w-6 h-5 sm:h-6 text-gray-300 hover:text-white'/>
                  {unreadCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className='absolute right-0 mt-2 w-80 bg-[#1e1e1e] border border-[#2f2f2f] rounded-xl shadow-xl z-50'
                    >
                      <div className='p-4 border-b border-[#2f2f2f]'>
                        <h3 className='text-lg font-semibold text-white'>Notifications</h3>
                      </div>
                      <div className='max-h-96 overflow-y-auto'>
                        {notifications.map((notification) => (
                          <div key={notification.id} className={`p-4 border-b border-[#2f2f2f] hover:bg-[#2f2f2f]/50 transition-colors ${notification.unread ? 'bg-[#2f2f2f]/30' : ''}`}>
                            <div className='flex items-start space-x-3'>
                              <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                              <div className='flex-1'>
                                <h4 className='text-sm font-medium text-white'>{notification.title}</h4>
                                <p className='text-xs text-gray-400 mt-1'>{notification.message}</p>
                                <p className='text-xs text-gray-500 mt-1'>{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='p-4 border-t border-[#2f2f2f]'>
                        <button className='w-full text-center text-sm text-blue-400 hover:text-blue-300'>
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className='relative'>
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className='flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-[#2f2f2f] transition-colors'
              >
                <Image src={admin} alt='admin' width={35} height={35} className='rounded-full border-gray-600'/>
                <span className='hidden sm:block text-gray-100 font-medium'>
                  John Mark
                </span>
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className='absolute right-0 mt-2 w-48 bg-[#1e1e1e] border border-[#2f2f2f] rounded-xl shadow-xl z-50'
                  >
                    <div className='p-4 border-b border-[#2f2f2f]'>
                      <div className='flex items-center space-x-3'>
                        <Image src={admin} alt='admin' width={40} height={40} className='rounded-full'/>
                        <div>
                          <p className='text-white font-medium'>John Mark</p>
                          <p className='text-gray-400 text-sm'>Administrator</p>
                        </div>
                      </div>
                    </div>
                    <div className='p-2'>
                      <button className='w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors'>
                        <User size={16} />
                        <span className='text-sm'>Profile</span>
                      </button>
                      <button className='w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors'>
                        <Settings size={16} />
                        <span className='text-sm'>Settings</span>
                      </button>
                      <button className='w-full flex items-center space-x-3 px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-[#2f2f2f] rounded-lg transition-colors'>
                        <LogOut size={16} />
                        <span className='text-sm'>Sign out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

    </header>
  )
}

export default Header
