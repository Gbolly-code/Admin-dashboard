"use client"

import StatCard from '@/components/StatCard'
import { DollarSign, ShoppingBag, SquareActivity, Users, TrendingUp, TrendingDown, Eye, ShoppingCart } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SalesOverviewChart from '@/components/SalesOverviewChart'
import CategoryDistributionChart from '@/components/CategoryDistributionChart'
import OrderDistributionChart from '@/components/OrderDistributionChart'
import ProductPerformanceChart from '@/components/ProductPerformanceChart'

const OverviewPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSales: 182450,
    totalClients: 1437,
    totalProducts: 674,
    totalOrders: 1245,
    salesGrowth: 12.5,
    clientsGrowth: 8.2,
    productsGrowth: -2.1,
    ordersGrowth: 15.3
  })

  const stats = [
    {
      name: "Total Sales",
      icon: DollarSign,
      value: `$${dashboardData.totalSales.toLocaleString()}`,
      growth: dashboardData.salesGrowth,
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      name: "Total Clients", 
      icon: Users,
      value: dashboardData.totalClients.toLocaleString(),
      growth: dashboardData.clientsGrowth,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      name: "Total Products",
      icon: ShoppingBag,
      value: dashboardData.totalProducts.toLocaleString(),
      growth: dashboardData.productsGrowth,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    {
      name: "Total Orders",
      icon: ShoppingCart,
      value: dashboardData.totalOrders.toLocaleString(),
      growth: dashboardData.ordersGrowth,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10"
    }
  ]

  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <main className='py-4'>
            {/* Welcome Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-8"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Welcome back, John!</h1>
              <p className="text-sm sm:text-base text-gray-400">Here's what's happening with your business today.</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f] hover:border-[#333] transition-all duration-300'
                  >
                    <div className='px-3 py-4 sm:px-4 sm:py-5 md:p-6'>
                      <div className="flex items-center justify-between">
                        <span className='flex items-center text-xs sm:text-sm font-medium text-gray-300'>
                          <stat.icon size={16} className="mr-1 sm:mr-2"/>
                          <span className="hidden sm:inline">{stat.name}</span>
                          <span className="sm:hidden text-xs">{stat.name.split(' ')[0]}</span>
                        </span>
                        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${stat.bgColor}`}>
                          {stat.growth > 0 ? (
                            <>
                              <TrendingUp size={10} className="mr-1" />
                              <span className={stat.color}>+{stat.growth}%</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown size={10} className="mr-1" />
                              <span className="text-red-400">{stat.growth}%</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className='mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-white'>{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8'>
              <SalesOverviewChart />
              <CategoryDistributionChart />
              <OrderDistributionChart/>
              <ProductPerformanceChart />
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f]'
              >
                <h3 className='text-lg font-semibold text-white mb-4'>Recent Activity</h3>
                <div className='space-y-4'>
                  {[
                    { action: "New order received", time: "2 minutes ago", type: "order", icon: ShoppingCart },
                    { action: "Product stock updated", time: "15 minutes ago", type: "product", icon: ShoppingBag },
                    { action: "New client registered", time: "1 hour ago", type: "client", icon: Users },
                    { action: "Sales report generated", time: "2 hours ago", type: "report", icon: Eye }
                  ].map((activity, index) => (
                    <div key={index} className='flex items-center space-x-3 p-3 rounded-lg bg-[#2f2f2f]/50 hover:bg-[#2f2f2f]/70 transition-colors'>
                      <div className='p-2 rounded-full bg-[#3f3f3f]'>
                        <activity.icon size={16} className="text-gray-400" />
                      </div>
                      <div className='flex-1'>
                        <p className='text-sm text-white'>{activity.action}</p>
                        <p className='text-xs text-gray-400'>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f]'
              >
                <h3 className='text-lg font-semibold text-white mb-4'>Quick Actions</h3>
                <div className='space-y-3'>
                  {[
                    { label: "Add New Product", icon: ShoppingBag, color: "bg-blue-600 hover:bg-blue-700" },
                    { label: "View Orders", icon: ShoppingCart, color: "bg-green-600 hover:bg-green-700" },
                    { label: "Manage Clients", icon: Users, color: "bg-purple-600 hover:bg-purple-700" },
                    { label: "Generate Report", icon: Eye, color: "bg-orange-600 hover:bg-orange-700" }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white transition-colors ${action.color}`}
                    >
                      <action.icon size={18} />
                      <span className='text-sm font-medium'>{action.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Performance Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f]'
              >
                <h3 className='text-lg font-semibold text-white mb-4'>Performance Summary</h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-400'>Conversion Rate</span>
                    <span className='text-green-400 font-semibold'>3.2%</span>
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-2'>
                    <div className='bg-green-400 h-2 rounded-full' style={{width: '32%'}}></div>
                  </div>
                  
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-400'>Customer Satisfaction</span>
                    <span className='text-blue-400 font-semibold'>4.8/5</span>
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-2'>
                    <div className='bg-blue-400 h-2 rounded-full' style={{width: '96%'}}></div>
                  </div>
                  
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-400'>Return Rate</span>
                    <span className='text-orange-400 font-semibold'>2.1%</span>
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-2'>
                    <div className='bg-orange-400 h-2 rounded-full' style={{width: '21%'}}></div>
                  </div>
                </div>
              </motion.div>
            </div>
        </main>
      
    </div>
  )
}

export default OverviewPage
