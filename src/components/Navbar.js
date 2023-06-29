import { AppBar, Tab, Tabs, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import './style/_navbar.scss'

export default function Navbar() {

    return (
        <AppBar position='static'>
            <Toolbar >
                <Tabs textColor='white' className='navbar-tabs'>
                    <Tab label="Home" to="/" component={Link} sx={{ fontSize: '1.2rem' }}></Tab>
                    <Tab label="Detail" to="/detail" component={Link} sx={{ fontSize: '1.2rem' }}></Tab>
                    <Tab label="Contact" to="/contact" component={Link} sx={{ fontSize: '1.2rem' }}></Tab>
                    <Tab label="About" to="/about" component={Link} sx={{ fontSize: '1.2rem' }}></Tab>
                </Tabs>
                <Tabs sx={{ marginLeft: "auto" }}>
                    <Tab label={<DashboardIcon style={{ color: 'white' }} />} to="/dashboard" component={Link}></Tab>
                </Tabs>
            </Toolbar>
        </AppBar>
    )
}
