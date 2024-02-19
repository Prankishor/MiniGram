import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth'
const Dashboard = () => {
    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
}

export default Dashboard
