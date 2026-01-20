import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';

const MainLayout: React.FC = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default MainLayout;