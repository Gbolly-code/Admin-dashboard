"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import uk from '../public/Images/uk.png'
import { Bell, Search, Settings, LogOut, User, X } from 'lucide-react'
import admin  from '../public/Images/admin.jpg'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/contexts/SidebarContext'


const Header = () => {
  const { isSidebarOpen } = useSidebar()
  const [showProfile, setShowProfile] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const messages = [
    { id: 1, from: "Ethan Carter", subject: "Order Update", time: "2 min ago", unread: true },
    { id: 2, from: "Sophia Mitchell", subject: "Product Return", time: "15 min ago", unread: true },
    { id: 3, from: "Liam Harrison", subject: "Bulk Order", time: "1 hour ago", unread: false },
    { id: 4, from: "Ava Bennett", subject: "Payment Issue", time: "3 hours ago", unread: false }
  ]

  const unreadMessagesCount = messages.filter(m => m.unread).length

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
            
            {/* Messages Button */}
            <div className='relative'>
                <button 
                  onClick={() => setShowMessages(!showMessages)}
                  className='relative p-2 rounded-full hover:bg-[#2f2f2f] transition-colors'
                >
                  <Bell className='w-5 sm:w-6 h-5 sm:h-6 text-gray-300 hover:text-white'/>
                  {unreadMessagesCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                      {unreadMessagesCount}
                    </span>
                  )}
                </button>
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

        {/* Messages Horizontal Panel */}
        <AnimatePresence>
          {showMessages && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='absolute top-full left-0 right-0 bg-[#1e1e1e] border-b border-[#2f2f2f] shadow-lg z-40'
            >
              <div className='p-4'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-white'>Recent Messages</h3>
                  <button 
                    onClick={() => setShowMessages(false)}
                    className='text-gray-400 hover:text-white'
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className='flex space-x-4 overflow-x-auto pb-2'>
                  {messages.map((message) => (
                    <div key={message.id} className='flex-shrink-0 bg-[#2f2f2f] rounded-lg p-3 w-64 hover:bg-[#2f2f2f]/70 transition-colors cursor-pointer'>
                      <div className='flex items-start space-x-3'>
                        <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                          {message.from.charAt(0)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between'>
                            <h4 className='text-sm font-medium text-white truncate'>{message.from}</h4>
                            {message.unread && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                            )}
                          </div>
                          <p className='text-xs text-gray-400 truncate mt-1'>{message.subject}</p>
                          <p className='text-xs text-gray-500 mt-1'>{message.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mt-4 text-center'>
                  <button className='text-blue-400 hover:text-blue-300 text-sm'>
                    View all messages →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

    </header>
  )
}

export default Header
