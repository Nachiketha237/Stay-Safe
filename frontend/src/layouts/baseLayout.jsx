// src/layouts/BaseLayout.js

import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Nav/Navbar';
import ChatDrawer from '../components/chatbot/chatbot';
import { useAuth } from "../hooks/useAuth";
import {jwtDecode} from 'jwt-decode';  // Corrected the import
import { refreshToken } from "../services/refreshtoken";
import { useDisclosure } from '@chakra-ui/react';

const BaseLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();
    const { username, setUsername } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const exp = decoded.exp;
                const currentTime = Date.now() / 1000;
                if (exp < currentTime) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    refreshToken();
                }
                setUsername(decoded.username);
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [setUsername, navigate]);

    if (username === '') {
        return <p>Loading...</p>; // Optionally, you can return a loading spinner here
    }

    return (
        <Box minHeight="100vh" position="relative">
            <Navbar />
            <Box p={5}>
                <Outlet />
            </Box>

            {/* Help Center Chat Drawer */}
            {location.pathname !== "/help-center" && (
                <ChatDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            )}
        </Box>
    );
};

export default BaseLayout;
