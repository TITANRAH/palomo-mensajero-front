import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ requirements, children, redirectTo = '/login' }) {
    if (!requirements) {
        return <Navigate to={redirectTo} replace />
    }

    return children
}

export default Protected