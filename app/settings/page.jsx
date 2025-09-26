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
import { useTheme } from "@/contexts/ThemeContext"

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [showPassword, setShowPassword] = useState(false)
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
        marketing: false
    })
    const { theme, setTheme, isLight } = useTheme()
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
        console.log('Settings saved:', { notifications, theme, language, timezone })
        alert('Settings saved successfully!')
    }

    const getInputClasses = () => {
        return `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLight 
                ? 'bg-white text-gray-900 border-gray-300' 
                : 'bg-[#2f2f2f] text-white border-[#3f3f3f]'
        }`
    }

    const getLabelClasses = () => {
        return `block text-sm font-medium mb-2 ${
            isLight ? 'text-gray-700' : 'text-gray-300'
        }`
    }

    const getSectionHeaderClasses = () => {
        return `text-xl font-semibold mb-6 ${
            isLight ? 'text-gray-900' : 'text-gray-100'
        }`
    }

    const getCardClasses = () => {
        return `backdrop-blur-md shadow-lg rounded-xl p-4 border ${
            isLight 
                ? 'bg-white border-gray-200' 
                : 'bg-[#2f2f2f] border-[#3f3f3f]'
        }`
    }

    return (
        <div className={`flex-1 overflow-auto relative z-10 ${
            isLight ? 'bg-gray-50' : 'bg-[#121212]'
        }`}>
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className={`text-3xl font-bold mb-2 ${
                        isLight ? 'text-gray-900' : 'text-gray-100'
                    }`}>Settings</h1>
                    <p className={isLight ? 'text-gray-600' : 'text-gray-400'}>Manage your account settings and preferences</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className={`backdrop-blur-md shadow-lg rounded-xl p-4 border ${
                            isLight 
                                ? 'bg-white border-gray-200' 
                                : 'bg-[#1e1e1e] border-[#1f1f1f]'
                        }`}>
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const IconComponent = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                                activeTab === tab.id
                                                    ? isLight 
                                                        ? 'bg-gray-100 text-gray-900' 
                                                        : 'bg-[#2f2f2f] text-white'
                                                    : isLight
                                                        ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                        <div className={`backdrop-blur-md shadow-lg rounded-xl p-6 border ${
                            isLight 
                                ? 'bg-white border-gray-200' 
                                : 'bg-[#1e1e1e] border-[#1f1f1f]'
                        }`}>
                            {/* Profile Settings */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h2 className={getSectionHeaderClasses()}>Profile Information</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={getLabelClasses()}>First Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John"
                                                className={getInputClasses()}
                                            />
                                        </div>
                                        <div>
                                            <label className={getLabelClasses()}>Last Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Doe"
                                                className={getInputClasses()}
                                            />
                                        </div>
                                        <div>
                                            <label className={getLabelClasses()}>Email</label>
                                            <input
                                                type="email"
                                                defaultValue="john.doe@example.com"
                                                className={getInputClasses()}
                                            />
                                        </div>
                                        <div>
                                            <label className={getLabelClasses()}>Phone</label>
                                            <input
                                                type="tel"
                                                defaultValue="+1 (555) 123-4567"
                                                className={getInputClasses()}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={getLabelClasses()}>Bio</label>
                                            <textarea
                                                rows={4}
                                                defaultValue="Administrator with 5+ years of experience in managing business operations and data analytics."
                                                className={getInputClasses()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notification Settings */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h2 className={getSectionHeaderClasses()}>Notification Preferences</h2>
                                    
                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className={getCardClasses()}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <Bell size={20} className={`mr-3 ${
                                                            isLight ? 'text-gray-500' : 'text-gray-400'
                                                        }`} />
                                                        <div>
                                                            <h3 className={`text-sm font-medium ${
                                                                isLight ? 'text-gray-900' : 'text-gray-100'
                                                            } capitalize`}>{key} Notifications</h3>
                                                            <p className={`text-xs ${
                                                                isLight ? 'text-gray-600' : 'text-gray-400'
                                                            } mt-1`}>
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
                                    <h2 className={getSectionHeaderClasses()}>Appearance & Theme</h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className={getLabelClasses()}>Theme</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => setTheme('light')}
                                                    className={`p-4 rounded-lg border-2 transition-colors ${
                                                        theme === 'light' 
                                                            ? 'border-blue-500 bg-blue-500/10' 
                                                            : isLight
                                                                ? 'border-gray-300 bg-gray-50 hover:border-gray-400'
                                                                : 'border-[#3f3f3f] bg-[#2f2f2f] hover:border-[#4f4f4f]'
                                                    }`}
                                                >
                                                    <Sun size={24} className={`mx-auto mb-2 ${
                                                        isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`} />
                                                    <p className={`text-sm ${
                                                        isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>Light</p>
                                                </button>
                                                <button
                                                    onClick={() => setTheme('dark')}
                                                    className={`p-4 rounded-lg border-2 transition-colors ${
                                                        theme === 'dark' 
                                                            ? 'border-blue-500 bg-blue-500/10' 
                                                            : isLight
                                                                ? 'border-gray-300 bg-gray-50 hover:border-gray-400'
                                                                : 'border-[#3f3f3f] bg-[#2f2f2f] hover:border-[#4f4f4f]'
                                                    }`}
                                                >
                                                    <Moon size={24} className={`mx-auto mb-2 ${
                                                        isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`} />
                                                    <p className={`text-sm ${
                                                        isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>Dark</p>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={getLabelClasses()}>Language</label>
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className={getInputClasses()}
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                                <option value="zh">Chinese</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={getLabelClasses()}>Timezone</label>
                                            <select
                                                value={timezone}
                                                onChange={(e) => setTimezone(e.target.value)}
                                                className={getInputClasses()}
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
                                    <h2 className={getSectionHeaderClasses()}>Security Settings</h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className={getLabelClasses()}>Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className={`${getInputClasses()} pr-12`}
                                                    placeholder="Enter current password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                                                        isLight ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={getLabelClasses()}>New Password</label>
                                            <input
                                                type="password"
                                                className={getInputClasses()}
                                                placeholder="Enter new password"
                                            />
                                        </div>

                                        <div>
                                            <label className={getLabelClasses()}>Confirm New Password</label>
                                            <input
                                                type="password"
                                                className={getInputClasses()}
                                                placeholder="Confirm new password"
                                            />
                                        </div>

                                        <div className={`p-4 rounded-lg border ${
                                            isLight 
                                                ? 'bg-yellow-50 border-yellow-200' 
                                                : 'bg-yellow-500/10 border-yellow-500/20'
                                        }`}>
                                            <div className="flex items-center">
                                                <Shield size={20} className="text-yellow-500 mr-3" />
                                                <div>
                                                    <h3 className="text-sm font-medium text-yellow-400">Two-Factor Authentication</h3>
                                                    <p className={`text-xs mt-1 ${
                                                        isLight ? 'text-yellow-600' : 'text-yellow-300'
                                                    }`}>Add an extra layer of security to your account</p>
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
                                    <h2 className={getSectionHeaderClasses()}>Data & Privacy</h2>
                                    
                                    <div className="space-y-6">
                                        <div className={getCardClasses()}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Download size={20} className={`mr-3 ${
                                                        isLight ? 'text-gray-500' : 'text-gray-400'
                                                    }`} />
                                                    <div>
                                                        <h3 className={`text-sm font-medium ${
                                                            isLight ? 'text-gray-900' : 'text-gray-100'
                                                        }`}>Export Data</h3>
                                                        <p className={`text-xs ${
                                                            isLight ? 'text-gray-600' : 'text-gray-400'
                                                        }`}>Download a copy of your data</p>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                                    Export
                                                </button>
                                            </div>
                                        </div>

                                        <div className={getCardClasses()}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Upload size={20} className={`mr-3 ${
                                                        isLight ? 'text-gray-500' : 'text-gray-400'
                                                    }`} />
                                                    <div>
                                                        <h3 className={`text-sm font-medium ${
                                                            isLight ? 'text-gray-900' : 'text-gray-100'
                                                        }`}>Import Data</h3>
                                                        <p className={`text-xs ${
                                                            isLight ? 'text-gray-600' : 'text-gray-400'
                                                        }`}>Upload data from another source</p>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                                                    Import
                                                </button>
                                            </div>
                                        </div>

                                        <div className={`p-4 rounded-lg border ${
                                            isLight 
                                                ? 'bg-red-50 border-red-200' 
                                                : 'bg-red-500/10 border-red-500/20'
                                        }`}>
                                            <div className="flex items-center">
                                                <Database size={20} className="text-red-500 mr-3" />
                                                <div>
                                                    <h3 className="text-sm font-medium text-red-400">Delete Account</h3>
                                                    <p className={`text-xs mt-1 ${
                                                        isLight ? 'text-red-600' : 'text-red-300'
                                                    }`}>Permanently delete your account and all data</p>
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
                            <div className={`mt-8 pt-6 border-t ${
                                isLight ? 'border-gray-200' : 'border-[#2f2f2f]'
                            }`}>
                                <div className="flex justify-end space-x-4">
                                    <button className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        isLight 
                                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                                            : 'bg-gray-600 text-white hover:bg-gray-700'
                                    }`}>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
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