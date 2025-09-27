"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Search, Send, Reply, Archive, Trash2, Star, Clock, User, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const messages = [
    {
      id: 1,
      from: "Ethan Carter",
      email: "ethan.carter@example.com",
      subject: "Order #A7B9D31 - Delivery Update",
      message: "Hi, I wanted to check on the status of my order. It was supposed to be delivered yesterday but I haven't received any updates. Could you please provide more information?",
      time: "2 minutes ago",
      unread: true,
      priority: "high",
      avatar: "/Images/user1.jpg"
    },
    {
      id: 2,
      from: "Sophia Mitchell", 
      email: "sophia.mitchell@example.co.uk",
      subject: "Product Return Request",
      message: "Hello, I received my laptop order but it has some issues. The screen flickers occasionally and the battery life is much shorter than expected. I would like to initiate a return process.",
      time: "15 minutes ago",
      unread: true,
      priority: "medium",
      avatar: "/Images/user2.jpg"
    },
    {
      id: 3,
      from: "Liam Harrison",
      email: "liam.harrison@example.de", 
      subject: "Bulk Order Inquiry",
      message: "Good day! I'm interested in placing a bulk order for our office. We need about 50 laptops and 100 mice. Could you provide a quote and any bulk discounts available?",
      time: "1 hour ago",
      unread: false,
      priority: "low",
      avatar: "/Images/user3.jpg"
    },
    {
      id: 4,
      from: "Ava Bennett",
      email: "ava.bennett@example.in",
      subject: "Payment Issue",
      message: "I'm having trouble processing my payment. The system keeps showing an error message. Could you help me resolve this? My order is ready but I can't complete the checkout.",
      time: "3 hours ago", 
      unread: false,
      priority: "high",
      avatar: "/Images/user4.jpg"
    },
    {
      id: 5,
      from: "Noah Reynolds",
      email: "noah.reynolds@example.au",
      subject: "Product Recommendation",
      message: "Hi! I'm looking for a gaming laptop under $2000. Could you recommend some options that would be good for both gaming and professional work?",
      time: "5 hours ago",
      unread: false,
      priority: "low", 
      avatar: "/Images/user5.jpg"
    }
  ]

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-500/5'
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-500/5'
      case 'low':
        return 'border-l-green-500 bg-green-500/5'
      default:
        return 'border-l-gray-500 bg-gray-500/5'
    }
  }

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='py-4'>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage customer communications and support requests</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl border border-[#1f1f1f] h-[600px] flex flex-col"
            >
              {/* Search */}
              <div className="p-4 border-b border-[#2f2f2f]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 border-b border-[#2f2f2f] cursor-pointer hover:bg-[#2f2f2f]/50 transition-colors ${getPriorityColor(message.priority)} border-l-4 ${
                      selectedMessage?.id === message.id ? 'bg-[#2f2f2f]' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Image
                          src={message.avatar}
                          alt={message.from}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        {message.unread && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white truncate">{message.from}</h4>
                          <div className="flex items-center space-x-2">
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-400">{message.time}</span>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-300 truncate mt-1">{message.subject}</p>
                        <p className="text-xs text-gray-500 truncate mt-1">{message.message.substring(0, 60)}...</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl border border-[#1f1f1f] h-[600px] flex flex-col"
            >
              {selectedMessage ? (
                <>
                  {/* Message Header */}
                  <div className="p-6 border-b border-[#2f2f2f]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={selectedMessage.avatar}
                          alt={selectedMessage.from}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{selectedMessage.from}</h3>
                          <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                          <Reply size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                          <Archive size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-white mt-4">{selectedMessage.subject}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{selectedMessage.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={14} />
                        <span className="capitalize">{selectedMessage.priority} priority</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-[#2f2f2f]/50 rounded-lg p-4">
                      <p className="text-gray-300 leading-relaxed">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {/* Reply Section */}
                  <div className="p-6 border-t border-[#2f2f2f]">
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <textarea
                          placeholder="Type your reply..."
                          className="w-full bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 resize-none"
                          rows={3}
                        ></textarea>
                      </div>
                      <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                        <Send size={18} />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Mail size={64} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a message</h3>
                    <p className="text-gray-500">Choose a message from the list to view details</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MessagesPage
