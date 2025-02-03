import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { useNotes } from "../hooks/useNotes";
import { ArchivedDashboard } from "../pages/ArchivedDashboard";
import { FilteredDashboard } from "../pages/FilteredDashboard";
import { ActiveDashboard } from "../pages/ActiveDashboard";
import { useState } from "react";

export const AppRoutes = () => {

    return(
        <>
            <Routes>
                <Route path="dashboard" element={<Dashboard />}/>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="dashboard/api/notes/archived" element={<ArchivedDashboard />} />
                <Route path="dashboard/api/notes/active" element={<ActiveDashboard />} />
                <Route path="dashboard/api/notes/tag/:id" element={<FilteredDashboard />} />
            </Routes>
        </>
    )
}