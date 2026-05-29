import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <nav className="w-64 bg-black text-white flex flex-col p-5 space-y-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 border-b-2">Admin <span className='text-amber-400'>Panel</span></h1>

        <Link
          to="/admin/user-management"
          className="px-4 py-2 rounded-lg hover:bg-mauve-700 transition duration-200"
        >
          User Management
        </Link>

        <Link
          to="/admin/product-management"
          className="px-4 py-2 rounded-lg hover:bg-mauve-700 transition duration-200"
        >
          Product Management
        </Link>

        <Link
          to="/admin/order-management"
          className="px-4 py-2 rounded-lg hover:bg-mauve-700 transition duration-200"
        >
          Order Management
        </Link>
      </nav>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-md p-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard