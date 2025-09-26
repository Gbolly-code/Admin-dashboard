"use client"

import StatCard from "@/components/StatCard"
import SalesOverviewChart from "@/components/SalesOverviewChart"
import CategoryDistributionChart from "@/components/CategoryDistributionChart"
import ProductPerformanceChart from "@/components/ProductPerformanceChart"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, ShoppingBag, Target } from "lucide-react"
import React, { useEffect, useState, useRef } from "react"

const SalesPage = () => {
    const [salesData, setSalesData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // Refs for scroll-triggered animations
    const headerRef = useRef(null)
    const statsRef = useRef(null)
    const chartsRef = useRef(null)
    const productPerfRef = useRef(null)
    const categoryTableRef = useRef(null)
    const monthlyBreakdownRef = useRef(null)
    
    // State for scroll-triggered animations (start with true for fallback)
    const [headerInView, setHeaderInView] = useState(true)
    const [statsInView, setStatsInView] = useState(false)
    const [chartsInView, setChartsInView] = useState(false)
    const [productPerfInView, setProductPerfInView] = useState(false)
    const [categoryTableInView, setCategoryTableInView] = useState(false)
    const [monthlyBreakdownInView, setMonthlyBreakdownInView] = useState(false)
    
    // Animation keys to force re-animation
    const [animationKey, setAnimationKey] = useState(0)

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const res = await fetch("/data/data.json")
                const data = await res.json()
                setSalesData(data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching sales data:", error)
                setLoading(false)
            }
        }
        fetchSalesData()
    }, [])

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "-100px 0px -100px 0px"
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const targetId = entry.target.getAttribute('data-section')
                
                if (entry.isIntersecting) {
                    // Section is coming into view - trigger animation
                    switch (targetId) {
                        case 'header':
                            setHeaderInView(true)
                            break
                        case 'stats':
                            setStatsInView(true)
                            break
                        case 'charts':
                            setChartsInView(true)
                            break
                        case 'productPerf':
                            setProductPerfInView(true)
                            break
                        case 'categoryTable':
                            setCategoryTableInView(true)
                            break
                        case 'monthlyBreakdown':
                            setMonthlyBreakdownInView(true)
                            break
                    }
                } else {
                    // Section is going out of view - reset animation state
                    switch (targetId) {
                        case 'header':
                            setHeaderInView(false)
                            break
                        case 'stats':
                            setStatsInView(false)
                            break
                        case 'charts':
                            setChartsInView(false)
                            break
                        case 'productPerf':
                            setProductPerfInView(false)
                            break
                        case 'categoryTable':
                            setCategoryTableInView(false)
                            break
                        case 'monthlyBreakdown':
                            setMonthlyBreakdownInView(false)
                            break
                    }
                }
            })
        }, observerOptions)

        // Observe all sections
        const sections = [
            { ref: headerRef, id: 'header' },
            { ref: statsRef, id: 'stats' },
            { ref: chartsRef, id: 'charts' },
            { ref: productPerfRef, id: 'productPerf' },
            { ref: categoryTableRef, id: 'categoryTable' },
            { ref: monthlyBreakdownRef, id: 'monthlyBreakdown' }
        ]

        sections.forEach(({ ref, id }) => {
            if (ref.current) {
                ref.current.setAttribute('data-section', id)
                observer.observe(ref.current)
            }
        })

        return () => observer.disconnect()
    }, [salesData])

    if (loading) {
        return (
            <div className="flex-1 overflow-auto relative z-10">
                <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-400">Loading sales data...</div>
                    </div>
                </main>
            </div>
        )
    }

    if (!salesData) {
        return (
            <div className="flex-1 overflow-auto relative z-10">
                <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-red-400">Error loading sales data</div>
                    </div>
                </main>
            </div>
        )
    }

    // Calculate total sales from monthly data
    const totalSales = salesData?.sales?.reduce((sum, month) => sum + month.sales, 0) || 0
    const averageMonthlySales = totalSales / (salesData?.sales?.length || 1)
    const highestMonth = salesData?.sales?.reduce((max, month) => 
        month.sales > max.sales ? month : max, salesData.sales[0]
    )
    const totalCategories = salesData?.categories?.length || 0

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Header */}
                <motion.div 
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-100 mb-2">Sales Analytics</h1>
                    <p className="text-gray-400">Comprehensive overview of sales performance and trends</p>
                </motion.div>

                {/* Stat Cards */}
                <motion.div 
                    key={`stats-${statsInView ? 'in' : 'out'}`}
                    ref={statsRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
                >
                    <StatCard 
                        name="Total Sales" 
                        icon={DollarSign} 
                        value={`$${totalSales.toLocaleString()}`} 
                    />
                    <StatCard 
                        name="Average Monthly" 
                        icon={TrendingUp} 
                        value={`$${Math.round(averageMonthlySales).toLocaleString()}`} 
                    />
                    <StatCard 
                        name="Best Month" 
                        icon={Target} 
                        value={highestMonth?.name || "N/A"} 
                    />
                    <StatCard 
                        name="Categories" 
                        icon={ShoppingBag} 
                        value={totalCategories.toString()} 
                    />
                </motion.div>

                {/* Charts Grid */}
                <motion.div 
                    key={`charts-${chartsInView ? 'in' : 'out'}`}
                    ref={chartsRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={chartsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
                >
                    {/* Sales Overview Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={chartsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ 
                            delay: 0.2, 
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        <SalesOverviewChart />
                    </motion.div>

                    {/* Category Distribution Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={chartsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ 
                            delay: 0.4, 
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        <CategoryDistributionChart />
                    </motion.div>
                </motion.div>

                {/* Product Performance Chart */}
                <motion.div
                    key={`productPerf-${productPerfInView ? 'in' : 'out'}`}
                    ref={productPerfRef}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={productPerfInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ 
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="mb-8"
                >
                    <ProductPerformanceChart />
                </motion.div>

                {/* Sales by Category Table */}
                <motion.div
                    key={`categoryTable-${categoryTableInView ? 'in' : 'out'}`}
                    ref={categoryTableRef}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={categoryTableInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ 
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 mb-8"
                >
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-6">Sales by Category</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Sales Value
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Percentage
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {salesData?.salesByCategory?.map((category, index) => {
                                    const totalCategorySales = salesData.salesByCategory.reduce((sum, cat) => sum + cat.value, 0)
                                    const percentage = ((category.value / totalCategorySales) * 100).toFixed(1)
                                    
                                    return (
                                        <motion.tr 
                                            key={`${category.name}-${categoryTableInView ? 'in' : 'out'}-${index}`}
                                            initial={{ opacity: 0, y: 20, x: -20 }}
                                            animate={categoryTableInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -20 }}
                                            transition={{ 
                                                delay: categoryTableInView ? index * 0.1 : 0, 
                                                duration: 0.5,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            className="hover:bg-[#2f2f2f] transition-colors hover:scale-[1.02] transform"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                                {category.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                ${category.value.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <div className="flex items-center">
                                                    <div className="w-full bg-gray-700 rounded-full h-2 mr-3">
                                                        <div 
                                                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-400">{percentage}%</span>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Monthly Sales Breakdown */}
                <motion.div
                    key={`monthlyBreakdown-${monthlyBreakdownInView ? 'in' : 'out'}`}
                    ref={monthlyBreakdownRef}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={monthlyBreakdownInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ 
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0"
                >
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-6">Monthly Sales Breakdown</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {salesData?.sales?.map((month, index) => (
                            <motion.div
                                key={`${month.name}-${monthlyBreakdownInView ? 'in' : 'out'}-${index}`}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={monthlyBreakdownInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ 
                                    delay: monthlyBreakdownInView ? index * 0.08 : 0, 
                                    duration: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="bg-[#2f2f2f] rounded-lg p-4 text-center hover:bg-[#3f3f3f] transition-colors hover:scale-105 transform"
                            >
                                <div className="text-sm font-medium text-gray-400 mb-1">{month.name}</div>
                                <div className="text-lg font-bold text-gray-100">${month.sales.toLocaleString()}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default SalesPage
