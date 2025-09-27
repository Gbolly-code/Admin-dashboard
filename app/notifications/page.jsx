"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Check, X, Trash2, Filter, Search, Clock, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "Order #A7B9D31 from Ethan Carter for $174.50",
      time: "2 minutes ago",
      type: "order",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Mouse inventory is running low (only 5 units remaining)",
      time: "15 minutes ago",
      type: "inventory",
      read: false,
      priority: "high"
    },
    {
      id: 3,
      title: "Payment Received",
      message: "$632.00 payment from Sophia Mitchell has been processed",
      time: "1 hour ago",
      type: "payment",
      read: true,
      priority: "medium"
    },
    {
      id: 4,
      title: "New Client Registered",
      message: "Liam Harrison from Germany has joined the platform",
      time: "3 hours ago",
      type: "user",
      read: true,
      priority: "low"
    },
    {
      id: 5,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM",
      time: "5 hours ago",
      type: "system",
      read: false,
      priority: "medium"
    },
    {
      id: 6,
      title: "Weekly Report Generated",
      message: "Sales report for the week has been generated and is ready for review",
      time: "1 day ago",
      type: "report",
      read: true,
      priority: "low"
    },
    {
      id: 7,
      title: "Security Alert",
      message: "Multiple failed login attempts detected from IP 192.168.1.100",
      time: "2 days ago",
      type: "security",
      read: false,
      priority: "high"
    },
    {
      id: 8,
      title: "Product Review",
      message: "New 5-star review received for Smartphone product",
      time: "3 days ago",
      type: "review",
      read: true,
      priority: "low"
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         (filter === 'read' && notification.read) ||
                         notification.type === filter

    return matchesSearch && matchesFilter
  })

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <CheckCircle size={20} className="text-green-400" />
      case 'inventory':
        return <AlertTriangle size={20} className="text-yellow-400" />
      case 'payment':
        return <CheckCircle size={20} className="text-blue-400" />
      case 'user':
        return <Info size={20} className="text-purple-400" />
      case 'system':
        return <AlertCircle size={20} className="text-orange-400" />
      case 'report':
        return <Info size={20} className="text-gray-400" />
      case 'security':
        return <AlertCircle size={20} className="text-red-400" />
      case 'review':
        return <CheckCircle size={20} className="text-green-400" />
      default:
        return <Bell size={20} className="text-gray-400" />
    }
  }

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

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Notifications</h1>
              <p className="text-sm sm:text-base text-gray-400">
                {unreadCount} unread notifications • {notifications.length} total
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Check size={16} />
                <span>Mark all as read</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f] mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-[#2f2f2f] text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                >
                  <option value="all">All Notifications</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="order">Orders</option>
                  <option value="inventory">Inventory</option>
                  <option value="payment">Payments</option>
                  <option value="user">Users</option>
                  <option value="system">System</option>
                  <option value="security">Security</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl border border-[#1f1f1f] p-6 hover:border-[#333] transition-all duration-300 ${getPriorityColor(notification.priority)} border-l-4 ${
                !notification.read ? 'bg-[#2f2f2f]/30' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <span className="text-sm text-gray-400">{notification.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mt-2">{notification.message}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        notification.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        notification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {notification.priority} priority
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
                        {notification.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#2f2f2f] rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredNotifications.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Bell size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No notifications found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default NotificationsPage
