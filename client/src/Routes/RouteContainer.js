import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoutesContainer from './AdminRoutesContainer'
import CompanyRoutesContainer from './CompanyRoutesContainer'
import UserRoutesContainer from './UserRoutesContainer'

function RouteContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<UserRoutesContainer />}/>
                <Route path='admin/*' element={<AdminRoutesContainer />}/>
                <Route path='company/*' element={<CompanyRoutesContainer />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteContainer