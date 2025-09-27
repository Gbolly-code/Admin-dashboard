"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Search, BookOpen, MessageCircle, Phone, Mail, ChevronRight, ChevronDown, ExternalLink, Download, Video, FileText } from 'lucide-react'

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen size={20} className="text-blue-400" />,
      questions: [
        {
          id: 1,
          question: 'How do I set up my admin dashboard?',
          answer: 'To set up your admin dashboard, first navigate to Settings and configure your basic information. Then add your first products and users. The dashboard will automatically populate with data once you start using the system.'
        },
        {
          id: 2,
          question: 'How do I add new products to the system?',
          answer: 'Go to the Products page and click the "Add Product" button. Fill in the product details including name, category, price, and stock quantity. Upload a product image and save the changes.'
        },
        {
          id: 3,
          question: 'How do I manage user accounts?',
          answer: 'Navigate to the Users page to view all registered users. You can edit user information, change their status (active/inactive), and manage their permissions from this page.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'Order Management',
      icon: <FileText size={20} className="text-green-400" />,
      questions: [
        {
          id: 4,
          question: 'How do I process a new order?',
          answer: 'Orders appear automatically in the Orders page when customers place them. You can view order details, update order status, and manage shipping information directly from the order management interface.'
        },
        {
          id: 5,
          question: 'How do I handle order cancellations?',
          answer: 'To cancel an order, go to the Orders page, find the order, and change its status to "Canceled". The system will automatically update inventory levels and notify the customer.'
        },
        {
          id: 6,
          question: 'How do I track order status?',
          answer: 'Each order shows its current status (Pending, Processing, Shipped, Delivered, Canceled). You can filter orders by status and update them as they progress through fulfillment.'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: <Video size={20} className="text-purple-400" />,
      questions: [
        {
          id: 7,
          question: 'How do I view sales analytics?',
          answer: 'The Dashboard page provides comprehensive sales analytics including revenue charts, category distribution, and performance metrics. You can also generate detailed reports from the Reports section.'
        },
        {
          id: 8,
          question: 'How do I export data for analysis?',
          answer: 'Use the export functionality available on each page (Users, Products, Orders) to download data in CSV format. This allows you to perform additional analysis in external tools.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <HelpCircle size={20} className="text-orange-400" />,
      questions: [
        {
          id: 9,
          question: 'What should I do if images are not loading?',
          answer: 'Check that your image files are properly uploaded to the Images folder in the public directory. Ensure file names match exactly and use supported formats (JPG, PNG, WebP).'
        },
        {
          id: 10,
          question: 'How do I reset my dashboard settings?',
          answer: 'Go to Settings > Advanced > Reset Dashboard. This will restore default settings while preserving your data. Always backup your data before performing a reset.'
        },
        {
          id: 11,
          question: 'The dashboard is loading slowly, what can I do?',
          answer: 'Try refreshing the page, clearing your browser cache, or checking your internet connection. If issues persist, contact technical support.'
        }
      ]
    }
  ]

  const supportOptions = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: <MessageCircle size={24} className="text-blue-400" />,
      action: 'Start Chat',
      available: 'Available 24/7'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with a support representative',
      icon: <Phone size={24} className="text-green-400" />,
      action: 'Call Now',
      available: 'Mon-Fri 9AM-6PM'
    },
    {
      title: 'Email Support',
      description: 'Send us your questions via email',
      icon: <Mail size={24} className="text-purple-400" />,
      action: 'Send Email',
      available: 'Response within 24h'
    }
  ]

  const filteredSections = faqSections.map(section => ({
    ...section,
    questions: section.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0)

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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Help Center</h1>
          <p className="text-sm sm:text-base text-gray-400">Find answers to common questions and get support</p>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f] mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search help articles and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            />
          </div>
        </motion.div>

        {/* Support Options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f] hover:border-[#333] transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                {option.icon}
                <div>
                  <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                  <p className="text-sm text-gray-400">{option.available}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{option.description}</p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                {option.action}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#1f1f1f] mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'User Manual', description: 'Complete guide to using the admin dashboard', icon: <Download size={20} /> },
              { title: 'Video Tutorials', description: 'Step-by-step video guides for common tasks', icon: <Video size={20} /> },
              { title: 'API Documentation', description: 'Technical documentation for developers', icon: <ExternalLink size={20} /> },
              { title: 'Release Notes', description: 'Latest updates and new features', icon: <FileText size={20} /> }
            ].map((link, index) => (
              <div key={link.title} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2f2f2f]/50 transition-colors cursor-pointer">
                <div className="text-gray-400">{link.icon}</div>
                <div>
                  <h4 className="text-white font-medium">{link.title}</h4>
                  <p className="text-sm text-gray-400">{link.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Sections */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          
          {filteredSections.length > 0 ? (
            filteredSections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl border border-[#1f1f1f]"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2f2f2f]/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {section.icon}
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                    <span className="text-sm text-gray-400">({section.questions.length} questions)</span>
                  </div>
                  {expandedSections[section.id] ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
                </button>
                
                {expandedSections[section.id] && (
                  <div className="border-t border-[#2f2f2f]">
                    {section.questions.map((question, questionIndex) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3, delay: questionIndex * 0.1 }}
                        className="p-6 border-b border-[#2f2f2f] last:border-b-0"
                      >
                        <h4 className="text-white font-medium mb-3">{question.question}</h4>
                        <p className="text-gray-300 leading-relaxed">{question.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or browse the categories above</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default HelpPage
