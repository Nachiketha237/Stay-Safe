import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Flex, Text, VStack, Divider } from '@chakra-ui/react';

function AdminPanel() {
    return (
        <Flex direction="row" minHeight="100vh">
            {/* Sidebar */}
            <Box width="250px" p="4" bg="gray.100">
                <VStack spacing="4" align="start">
                    <Text fontSize="xl" fontWeight="bold">Admin Panel</Text>
                    <Link to="/admin/announcements">Announcements</Link>
                    <Link to="/admin/asign">Volunteers</Link>
                    <Link to="/admin/insights">Disaster Insights</Link>

                </VStack>
                <Divider my="4" />
                <Link to="/">Home</Link>
            </Box>

            {/* Main Content */}
            <Box flex="1" p="4">
                <Outlet />
            </Box>
        </Flex>
    );
}

export default AdminPanel;
