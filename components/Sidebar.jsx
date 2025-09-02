'use client'

import { DollarSign, House, Info, Mail, Settings, ShoppingBag, ShoppingCart, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ICONS = {
    House,
    DollarSign,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Mail,
    Users,
    Bell,
    Info
}

const Sidebar = () => {

    const [sidebarItems, setSidebarItems] = useState([])
    const pathname = usePathname()

    useEffect(() => {
        fetch("data/data.json").then((res) => res.json()).then((data) => setSidebarItems(data.sidebarItems))
    }, [])
  return (
    <div>
      sidebar
    </div>
  )
}

export default Sidebar
