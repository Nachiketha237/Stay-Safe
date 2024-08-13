import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Heading, Input, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin' // Update with the correct path to your hook

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const { loading, error, login } = useLogin();

    useEffect(() => {
        if (error) {
            toast({
                title: "Login failed.",
                description: "Please check your credentials and try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [error, toast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(loginData);
            navigate("/"); // Redirect to home or dashboard
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Box p={5} bg="gray.50" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
            <Box bg="white" p={8} borderRadius="md" boxShadow="md" maxWidth="400px" width="100%">
                <Heading mb={6} color="teal.700" textAlign="center">Login</Heading>
                <form onSubmit={onFormSubmit}>
                    <VStack spacing={4}>
                        <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" colorScheme="teal" width="full">Login</Button>
                    </VStack>
                </form>
                <Text mt={4} textAlign="center">
                    Don't have an account? <a href="/register" style={{ color: 'teal.500' }}>Register</a>
                </Text>
            </Box>
        </Box>
    );
};

export default Login;
