"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, UserPlus, Search, Filter, Download, Mail, Phone, MapPin, Calendar, UserCheck, RotateCcw } from "lucide-react"
import Image from "next/image"

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddUser, setShowAddUser] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/data/data.json")
        const data = await res.json()
        setUsers(data.clients)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.country.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Get user status based on ID (same logic as getStatusColor)
    const userStatus = ['active', 'inactive', 'pending'][user.id % 3]
    
    // Filter by status if not 'all'
    const matchesStatus = filterStatus === 'all' || userStatus === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (user) => {
    // Mock status based on user ID
    const statuses = ['active', 'inactive', 'pending']
    const status = statuses[user.id % 3]
    
    switch (status) {
      case 'active':
        return { bg: 'bg-green-400/10', text: 'text-green-400', dot: 'bg-green-400' }
      case 'inactive':
        return { bg: 'bg-red-400/10', text: 'text-red-400', dot: 'bg-red-400' }
      case 'pending':
        return { bg: 'bg-yellow-400/10', text: 'text-yellow-400', dot: 'bg-yellow-400' }
      default:
        return { bg: 'bg-gray-400/10', text: 'text-gray-400', dot: 'bg-gray-400' }
    }
  }

  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <main className='py-4'>
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Users Management</h1>
                  <p className="text-sm sm:text-base text-gray-400">Manage your customers and their information</p>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8"
            >
              {[
                { title: "Total Users", value: users.length, icon: Users, color: "text-blue-400", bgColor: "bg-blue-400/10" },
                { title: "Active Users", value: Math.floor(users.length * 0.7), icon: UserCheck, color: "text-green-400", bgColor: "bg-green-400/10" },
                { title: "New This Month", value: Math.floor(users.length * 0.2), icon: UserPlus, color: "text-purple-400", bgColor: "bg-purple-400/10" },
                { title: "Returning Users", value: Math.floor(users.length * 0.5), icon: RotateCcw, color: "text-orange-400", bgColor: "bg-orange-400/10" }
              ].map((stat, index) => (
                <div key={stat.title} className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-3 sm:p-4 md:p-6 border border-[#1f1f1f]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">{stat.title}</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon size={16} className={`${stat.color} sm:w-6 sm:h-6`} />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Search and Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f] mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Filter size={16} className="text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-[#2f2f2f] text-white rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Users Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredUsers.map((user, index) => {
                const statusColors = getStatusColor(user)
                const status = ['active', 'inactive', 'pending'][user.id % 3]
                
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-[#1f1f1f] hover:border-[#333] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Image 
                          src={`/Images/${user.image.split('/').pop()}`} 
                          alt={user.name} 
                          width={50} 
                          height={50} 
                          className="rounded-full border-2 border-gray-600"
                        />
                        <div>
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          <p className="text-gray-400 text-sm">{user.country}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusColors.bg}`}>
                        <div className={`w-2 h-2 rounded-full ${statusColors.dot}`}></div>
                        <span className={`text-xs font-medium ${statusColors.text}`}>{status}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Mail size={16} />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Phone size={16} />
                        <span className="text-sm">{user.phoneNumber}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <MapPin size={16} />
                        <span className="text-sm">{user.country}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#2f2f2f]">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar size={14} />
                        <span className="text-xs">Member since 2024</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                          <Mail size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                          <Users size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {filteredUsers.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Users size={64} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No users found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
        </main>
    </div>
  )
}

export default UsersPage