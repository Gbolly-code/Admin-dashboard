"use client"

import { motion } from "framer-motion"
import { 
    Settings, 
    User, 
    Bell, 
    Palette, 
    Shield, 
    Database, 
    Download, 
    Upload,
    Save,
    Eye,
    EyeOff,
    Moon,
    Sun,
    Globe,
    Lock,
    Key,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock
} from "lucide-react"
import React, { useState } from "react"

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [showPassword, setShowPassword] = useState(false)
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
        marketing: false
    })
    const [language, setLanguage] = useState('en')
    const [timezone, setTimezone] = useState('UTC')

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'appearance', name: 'Appearance', icon: Palette },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'data', name: 'Data & Privacy', icon: Database }
    ]

    const handleNotificationChange = (type) => {
        setNotifications(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    const handleSave = () => {
        // Here you would typically save settings to a backend
        console.log('Settings saved:', { notifications, language, timezone })
        alert('Settings saved successfully!')
    }

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-100 mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account settings and preferences</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 border border-[#1f1f1f]">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const IconComponent = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                                activeTab === tab.id
                                                    ? 'bg-[#2f2f2f] text-white'
                                                    : 'text-gray-400 hover:bg-[#2f2f2f] hover:text-white'
                                            }`}
                                        >
                                            <IconComponent size={20} className="mr-3" />
                                            {tab.name}
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f]">
                            {/* Profile Settings */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Profile Information</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John"
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Doe"
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue="john.doe@example.com"
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                defaultValue="+1 (555) 123-4567"
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                            <textarea
                                                rows={4}
                                                defaultValue="Administrator with 5+ years of experience in managing business operations and data analytics."
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notification Settings */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Notification Preferences</h2>
                                    
                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className="p-4 bg-[#2f2f2f] rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <Bell size={20} className="text-gray-400 mr-3" />
                                                        <div>
                                                            <h3 className="text-sm font-medium text-gray-100 capitalize">{key} Notifications</h3>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                {key === 'email' && 'Receive notifications via email'}
                                                                {key === 'push' && 'Receive push notifications in browser'}
                                                                {key === 'sms' && 'Receive notifications via SMS'}
                                                                {key === 'marketing' && 'Receive marketing and promotional emails'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleNotificationChange(key)}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                            value ? 'bg-blue-600' : 'bg-gray-600'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                value ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Appearance Settings */}
                            {activeTab === 'appearance' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Appearance & Theme</h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    className="p-4 rounded-lg border-2 border-[#3f3f3f] bg-[#2f2f2f] hover:border-[#4f4f4f] transition-colors"
                                                >
                                                    <Sun size={24} className="mx-auto mb-2 text-gray-300" />
                                                    <p className="text-sm text-gray-300">Light</p>
                                                </button>
                                                <button
                                                    className="p-4 rounded-lg border-2 border-blue-500 bg-blue-500/10 transition-colors"
                                                >
                                                    <Moon size={24} className="mx-auto mb-2 text-gray-300" />
                                                    <p className="text-sm text-gray-300">Dark</p>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                                <option value="zh">Chinese</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                                            <select
                                                value={timezone}
                                                onChange={(e) => setTimezone(e.target.value)}
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="UTC">UTC (Coordinated Universal Time)</option>
                                                <option value="EST">EST (Eastern Time)</option>
                                                <option value="PST">PST (Pacific Time)</option>
                                                <option value="GMT">GMT (Greenwich Mean Time)</option>
                                                <option value="CET">CET (Central European Time)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Security Settings</h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                                    placeholder="Enter current password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter new password"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-3 bg-[#2f2f2f] text-white rounded-lg border border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Confirm new password"
                                            />
                                        </div>

                                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                            <div className="flex items-center">
                                                <Shield size={20} className="text-yellow-500 mr-3" />
                                                <div>
                                                    <h3 className="text-sm font-medium text-yellow-400">Two-Factor Authentication</h3>
                                                    <p className="text-xs text-yellow-300 mt-1">Add an extra layer of security to your account</p>
                                                </div>
                                            </div>
                                            <button className="mt-3 px-4 py-2 bg-yellow-500 text-black text-sm font-medium rounded-lg hover:bg-yellow-400 transition-colors">
                                                Enable 2FA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Data & Privacy Settings */}
                            {activeTab === 'data' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Data & Privacy</h2>
                                    
                                    <div className="space-y-6">
                                        <div className="p-4 bg-[#2f2f2f] rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Download size={20} className="text-gray-400 mr-3" />
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-100">Export Data</h3>
                                                        <p className="text-xs text-gray-400">Download a copy of your data</p>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                                    Export
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-[#2f2f2f] rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Upload size={20} className="text-gray-400 mr-3" />
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-100">Import Data</h3>
                                                        <p className="text-xs text-gray-400">Upload data from another source</p>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                                                    Import
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <div className="flex items-center">
                                                <Database size={20} className="text-red-500 mr-3" />
                                                <div>
                                                    <h3 className="text-sm font-medium text-red-400">Delete Account</h3>
                                                    <p className="text-xs text-red-300 mt-1">Permanently delete your account and all data</p>
                                                </div>
                                            </div>
                                            <button className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="mt-8 pt-6 border-t border-[#2f2f2f]">
                                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                                    <button className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                    >
                                        <Save size={16} className="mr-2" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

export default SettingsPage